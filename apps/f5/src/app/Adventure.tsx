import React, { useState, useEffect } from 'react';
import { environment } from '../environments/environment';
import Typography from '@material-ui/core/Typography';
import { LoadingSpinner } from './LoadingSpinner';
import { useStyles } from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useData } from './firebase';
import { EndMessage } from './EndMessage';
import { AdventureOptionCard } from './AdventureOptionCard';
import { storage } from './storage';
import { Option } from './firebase';
import { useQueryParams, StringParam } from 'use-query-params'; 
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GitHubIcon from '@material-ui/icons/GitHub';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FeedbackIcon from '@material-ui/icons/Feedback'; 
import BrushIcon from '@material-ui/icons/Brush'; 
import OpenInNewIcon from '@material-ui/icons/OpenInNew'; 
import AppBar from '@material-ui/core/AppBar';
import App from './app';
import { Fab, useTheme, Divider, Grid, Switch } from '@material-ui/core';
import Markdown from 'markdown-to-jsx';
import { useThemePrefs } from './hooks';
import SideBar from './SideBar';

function hashCode(s) {
  for(var i = 0, h = 0; i < s.length; i++)
      h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  return h;
}

const weight = (option: Option) => {
  const userId = storage.userId();
  const optionId = option.id;
  const weight = hashCode(userId)/hashCode(optionId);
  return {
    ...option,
    weight,
  }
}

const numOptions = environment.numResponses;
const maxResponses = environment.maxResponses;

export default function Adventure(props) {
  const userId = storage.userId();
  const classes = useStyles();
  const [size, setSize] = useState(4);
  const [query, setQuery] = useQueryParams({
    to: StringParam,
    from: StringParam,
    focus: StringParam,
  });
  const { to, from, focus } = query;
  const { 
    state: data, setCurrent: setCurrentState,
    createOption, updateNode,
  } = useData();
  const fetchData = () => 
    setSize(size + 3);
  const state = () => {
    const current = 
     to && data.nodes.find(n => n.id === to)
     || 
     data.nodes.find(n => n.id === data.current)
     || 
     data.root
    ;
    if (!current) {
      return {
        current: data.root,
        canReply: false,
        isPrompt: false,
        children: [],
        prev: [],
      };
    }
    const children = data.nodes
      .filter(n => current.children.includes(n.id))
      .map(n => weight(n))
      .sort((a, b) => b.weight - a.weight)
      .slice(0, numOptions) 
      ;
    const isPrompt = current.type === 'prompt';
    const canReply = 
      (isPrompt || children.length === 0)
      && userId !== current.creatorId
      && (children.length < maxResponses || maxResponses === -1)
      ;
    const prev: Option[] = [];
    let it = current;
    const searchId = from || data.root.id;
    while (it && it.id !== searchId) {
      prev.push(it);
      it = data.nodes.find(n => n.id === it.parent);
    }
    return {
      current,
      canReply,
      isPrompt,
      children,
      prev: prev.reverse(),
    };
  }

  const {
      current,
      canReply,
      children,
      prev,
  } = state();

  useEffect(() => {
    if (current && current.id === data.root.id) {
      if (!to && !from && !focus) {
        setQuery({
          to: data.root.id,
          from: data.root.id,
          focus: data.root.id,
        });
      }
    }
  });

  const setCurrent = (targetId: string) => {
    const newQuery = { ...query };
    if (!from)
      newQuery.from = current.id;
    if (!to || to === current.id)
      newQuery.to = targetId;
    newQuery.focus = targetId;
    setQuery(newQuery);
    setCurrentState(targetId);
  }

  console.log('state', {
    ...state(),
    userId,
    to, from, focus,
    prev,
  });

  const nodes: Option[] = data.nodes;

  return (
    <div className={classes.paper}>
      <SideBar/>
      <Typography component="h1" variant="h5">
        <Markdown>
          {environment.header}
        </Markdown>
      </Typography>
      <div className={classes.cards}>
        <InfiniteScroll
          dataLength={size}
          next={fetchData}
          hasMore={size < nodes.length}
          loader={<LoadingSpinner/>}
          endMessage={<EndMessage/>}
        >
          {nodes.map((node, i) => {
            return (
              <AdventureOptionCard 
                createOption={updateNode}
                key={'prev-' + i}
                {...node}
                prev
              />
            )
          })}
          {current &&
            <AdventureOptionCard 
              showBackButton={false}
              key={'add'}
              new
              parent={current.id}
              createOption={createOption}
              type={'action'}
            />
          }
        </InfiniteScroll>
      </div>
    </div>
  );
}