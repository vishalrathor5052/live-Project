import React, { FC } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';

import theme from './theme';
import RootRouter from './routes/RootRouter';
import { persistor, store } from './store';

const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <CssBaseline />
            <RootRouter />
          </LocalizationProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
