import React from 'react';
import { CardContent, Grid, Switch } from '@material-ui/core';
import { useFilter } from '@parm/react/filter-control';
import { useSortState } from './hooks';
import { useData } from './firebase';

export const SearchBar = () => {
  const { toggleSort, sortAscending } = useSortState();
  const { filter: { control } } = useData();
  return (
    <CardContent>
      <Grid container spacing={1}>
        <Grid item xs={10}>
          {control}
        </Grid>
        <Grid item xs={2}>
          oldest first
          <Switch 
            checked={sortAscending}
            onChange={toggleSort} 
          />
        </Grid>
      </Grid>
    </CardContent>
  );
}