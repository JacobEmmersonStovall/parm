import React from 'react';
import ReactFileUpload, { ReactFileUploadProps } from './react-file-upload';
import { storiesOf } from '@storybook/react';

export const Component = (props: ReactFileUploadProps) => {
  return (
    <ReactFileUpload {...props}/>
  );
};

storiesOf('ReactFileUpload', module)
  .add('default', () => (
    <Component
      url="https://httpbin.org/post"
    />)
  );
