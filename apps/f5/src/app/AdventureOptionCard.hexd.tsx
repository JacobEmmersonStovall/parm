import React from 'react';
import { useStyles } from './useStyles';
import { 
  Card, CardContent, 
} from '@material-ui/core';
import { LoadingSpinner } from './LoadingSpinner';
import LazyLoad from 'react-lazyload';
import { Markdown } from './Markdown';

export const AdventureOptionCard = (row: any) => {
  const classes = useStyles();
  const loading = row == null ? <LoadingSpinner /> : false;
  return (
    <Card className={classes.card} id={row.id}>
      <LazyLoad
        className={classes.avatar}
        once
        placeholder={<LoadingSpinner />}
      >
        {loading || (
          <>
            <CardContent>
              <Markdown>
                {row.text || ''}
              </Markdown>
            </CardContent>
          </>
        )}
      </LazyLoad>
    </Card>
  );
}