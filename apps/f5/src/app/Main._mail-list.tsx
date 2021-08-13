import React from 'react';
import { CurrentCard } from './CurrentCard';
import { Description } from './Description';
import { HeaderImage } from './HeaderImage';
import { useStyles } from './useStyles';

export default function Adventure(props) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <HeaderImage/>
      <Description/>
      <CurrentCard/>
    </div>
  );
}
