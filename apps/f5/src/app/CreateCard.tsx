import React from 'react';
import { useQueryParams, StringParam } from 'use-query-params';
import { AdventureOptionCard } from './AdventureOptionCard';
import { useData, Option } from './firebase';
import { useStyles } from './useStyles';

export const CreateCard = () => {
  const classes = useStyles();
  const { 
    state: data, setCurrent: setCurrentState,
    createOption, updateNode,
  } = useData();
  const [query, setQuery] = useQueryParams({
    focus: StringParam,
  });
  const focus = query.focus || 'create';
  const rootId = data.root && data.root.id;
  return (
    <div className={classes.cards}>
      {focus === 'create' && (
        <AdventureOptionCard
          showBackButton={false}
          key={'add'}
          new
          parent={rootId}
          createOption={createOption}
          type={'action'}
        />
      )}
    </div>
  );
}