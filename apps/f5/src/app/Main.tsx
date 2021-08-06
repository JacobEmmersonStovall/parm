import React from 'react';
import { CardScroller } from './CardScroller';
import { CreateCard } from './CreateCard';
import { CurrentCard } from './CurrentCard';
import { Description } from './Description';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import SideBar from './SideBar';
import { useStyles } from './useStyles';

export default function Adventure(props) {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <SideBar/>
      <Header/>
      <Description/>
      <SearchBar/>
      <CreateCard/>
      <CurrentCard/>
      <CardScroller/>
    </div>
  );
}
