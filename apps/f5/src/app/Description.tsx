import { Typography } from '@material-ui/core';
import Markdown from 'markdown-to-jsx';
import React from 'react';
import { environment } from '../environments/environment';

export const Description = () => {
  return (
    <Typography>
      {environment.metaDescription && (
        <Markdown>
          {environment.metaDescription}
        </Markdown>
      )}
    </Typography>
  );
}