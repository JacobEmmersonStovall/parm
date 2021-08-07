import React from 'react';
import { CardScroller } from './CardScroller';
import { Description } from './Description';
import { HeaderImage } from './HeaderImage';
import { useStyles } from './useStyles';

export default function Adventure(props) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <HeaderImage/>
      <Description/>
      <CardScroller/>
    </div>
  );
}
