import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import Main from './src/Main';
import CombineReducer from './src/CombineReducer';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F970B9',
    surface: 'white',
  }
}

export default function App() {
  return (
    <ReduxProvider store={createStore(CombineReducer)}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </ReduxProvider>
  );
}
