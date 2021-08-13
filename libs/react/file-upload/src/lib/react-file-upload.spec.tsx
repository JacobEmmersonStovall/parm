import React from 'react';
import { render } from '@testing-library/react';

import ReactFileUpload from './react-file-upload';

describe(' ReactFileUpload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactFileUpload url=""/>);
    expect(baseElement).toBeTruthy();
  });
});
