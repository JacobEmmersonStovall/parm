import { Typography } from '@material-ui/core';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { environment } from '../environments/environment';

export const Header = () => {
  return (
    <Typography component="h1" variant="h5">
      <Markdown>
        {environment.header}
      </Markdown>
    </Typography>
  );
}