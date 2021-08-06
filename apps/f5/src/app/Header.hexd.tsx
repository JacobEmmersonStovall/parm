import { Typography } from '@material-ui/core';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { environment } from '../environments/environment';

export const Header = () => {
  const style: React.CSSProperties = {
    width: '100%',
  };
  return (
    <img style={style} src="meta.image.hexd.png"/>
  );
}