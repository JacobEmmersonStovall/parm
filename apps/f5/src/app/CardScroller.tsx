import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { AdventureOptionCard } from './AdventureOptionCard';
import { CreateCard } from './CreateCard';
import { EndMessage } from './EndMessage';
import { useData } from './firebase';
import { LoadingSpinner } from './LoadingSpinner';
import { storage } from './storage';
import { Option } from './firebase';

const compareByTime = (a: Option, b: Option) => {
  const result = +a.createTime.toDate() - +b.createTime.toDate();
  return storage.sort() ? result : -result;
}

export const CardScroller = () => {
  const { 
    state: data, updateNode, filter: { predicate }
  } = useData();
  const [afterSize, setAfterSize] = useState(4);
  const [beforeSize, setBeforeSize] = useState(1);
  const fetchAfter = () => 
    setAfterSize(afterSize + 3); 
  const fetchBefore = () => 
    setBeforeSize(beforeSize + 3); 
  const nodes: Option[] = data.nodes
    .filter(v => predicate(v.text))
    .sort(compareByTime)
    ;
  return (
    <InfiniteScroll
      dataLength={afterSize}
      next={fetchAfter}
      hasMore={afterSize < nodes.length}
      loader={<LoadingSpinner />}
      endMessage={<EndMessage />}
    >
      {nodes.slice(0, afterSize).map((node, i) => {
        return (
          <AdventureOptionCard
            createOption={updateNode}
            key={'after-' + i}
            {...node}
            prev
          />
        )
      })}
      <CreateCard />
    </InfiniteScroll>
  );
}