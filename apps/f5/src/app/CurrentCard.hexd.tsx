import React from 'react';
import { useQueryParams, StringParam } from 'use-query-params';
import { AdventureOptionCard } from './AdventureOptionCard';
import { useData, Option } from './firebase';
import { useStyles } from './useStyles';

export const CurrentCard = () => {
  const classes = useStyles();
  const { 
    state: data, setCurrent: setCurrentState,
    createOption, updateNode,
  } = useData();
  const [query, setQuery] = useQueryParams({
    focus: StringParam,
  });
  const focus = query.focus || 'create';
  const nodes: Option[] = data.nodes;
  console.log(nodes);
  const focusNode = nodes.find(n => n.id !== 'create');
  return (
    <div className={classes.cards}>
      {true && (
        <AdventureOptionCard
          createOption={updateNode}
          key={'focus'}
          {...focusNode}
          prev
        />
      )}
    </div>
  );
}