import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import ReduxThunk from 'redux-thunk';
import Main from './src/Main';
import CombineReducer from './src/CombineReducer';

const theme = {
  ...DefaultTheme,
  colors: {  
    ...DefaultTheme.colors,
    primary: '#F970B9',
    surface: 'white',
    accent: '#F970B9',
  }
}

export default function App() {
  return (
    <ReduxProvider store={createStore(CombineReducer, applyMiddleware(ReduxThunk))}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </ReduxProvider>
  );
}
