import React from 'react';
import { CurrentCard } from './CurrentCard';
import { Description } from './Description';
import { Header } from './Header';
import { useStyles } from './useStyles';

export default function Adventure(props) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Header/>
      <Description/>
      <CurrentCard/>
    </div>
  );
}
