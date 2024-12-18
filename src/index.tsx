import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import SearchPage from './pages/Search/Search';
import { Masthead } from "@lifesg/react-design-system/masthead";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Masthead />
      <SearchPage />
    </ThemeProvider>
  </React.StrictMode>
);
