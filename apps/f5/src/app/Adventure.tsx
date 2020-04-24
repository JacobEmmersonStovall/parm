import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { LoadingSpinner } from './LoadingSpinner';
import { useStyles } from './useStyles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useData } from './firebase';
import { GithubButton } from './GithubButton';
import { FeedbackButton } from './FeedbackButton';
import { EndMessage } from './EndMessage';
import { AdventureOptionCard } from './AdventureOptionCard';
import { storage } from './storage';
import { Option } from './firebase';
import { useQueryParam, StringParam } from 'use-query-params'; 

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

const numOptions = 3;

export default function Adventure(props) {
  const userId = storage.userId();
  const classes = useStyles();
  const [size, setSize] = useState(4);
  const [from, setFrom] = useQueryParam('from', StringParam);
  const [to, setTo] = useQueryParam('to', StringParam);
  const [focus, setFocus] = useQueryParam('focus', StringParam);
  const { state: data, setCurrent: setCurrentState, createOption } = useData();
  const fetchData = () => 
    setSize(size + 3);
  const state = () => {
    const current = 
     data.nodes.find(n => n.id === data.current)
     || focus && data.nodes.find(n => n.id === focus)
     || data.root
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
    const canReply = (isPrompt || children.length === 0) && userId !== current.creatorId;
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

  const setCurrent = (targetId: string) => {
    if (!from)
      setFrom(current.id);
    if (!to || to === current.id)
      setTo(targetId);
    setFocus(targetId);
    setCurrentState(targetId);
  }

  console.log('state', {
    ...state(),
    userId,
    to, from, focus,
    prev,
  });

  return (
    <div className={classes.paper}>
      <span className={classes.rightShoulder}>
        <GithubButton />
        <FeedbackButton />
      </span>
      <Typography component="h1" variant="h5">
        <Typography component="span"> Oh fuck! </Typography>
        <Typography component="span" className={classes.italic}> Oh fuck! </Typography>
      </Typography>
      <div className={classes.cards}>
        <InfiniteScroll
          dataLength={size}
          next={fetchData}
          hasMore={canReply || children.length > 0}
          loader={<LoadingSpinner/>}
          endMessage={<EndMessage/>}
        >
          <AdventureOptionCard key={'current'} {...data.root} root />
          {prev.map((node, i) => {
            return (
              <AdventureOptionCard key={'prev-' + i} {...node} prev />
            )
          })}
          <AdventureOptionCard key={'prompt'} current />
          {children.map((node, i) => {
              return (
                <AdventureOptionCard key={i} {...node} setCurrent={setCurrent} />
              )
          })}
          {canReply && (
            <AdventureOptionCard 
              key={'add'}
              new
              parent={current.id}
              createOption={createOption}
              type={current.type === 'prompt' ? 'action' : 'prompt'}
            />
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}