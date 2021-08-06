import React from 'react';

import { Container, CssBaseline, ThemeProvider, Theme, createMuiTheme, Typography } from '@material-ui/core';
import { useThemePrefs } from './hooks';
import Main from './Main';

const withContainer = (Component: React.ComponentType) => () => {
  const { theme } = useThemePrefs(); 
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Component />
      </Container>
    </ThemeProvider>
  );
}

export const App = withContainer(() => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  return (
    <Main/>
  );
});

export default App;