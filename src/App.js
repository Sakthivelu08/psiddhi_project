import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import AttachmentModule from './containers';
import { ThemeProvider } from '@emotion/react';
import { Suspense } from 'react';
import AttachmentProvider from './containers/contexts/AttachmentContext';
import theme from './theme';
import { Typography } from '@mui/material';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <AttachmentProvider>
                <AttachmentModule />
              </AttachmentProvider>
            }
          />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;