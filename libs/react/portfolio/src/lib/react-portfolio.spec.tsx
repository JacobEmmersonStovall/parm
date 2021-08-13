import React from 'react';
import { render } from '@testing-library/react';

import ReactPortfolio from './react-portfolio';

describe(' ReactPortfolio', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactPortfolio />);
    expect(baseElement).toBeTruthy();
  });
});
