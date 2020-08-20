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
    <ReduxProvider store={createStore(CombineReducer, {
      Count: {
        Count: 0,
      },
      Card: {
        OverviewSurveyCategory: {
          Title: "테스트",
          Cards: [],
        },
        OverviewVideoCategory: {
          Title: "추천 영상",
          Cards: [],
        },
        OverviewColumnCategory: {
          Title: "추천 칼럼",
          Cards: [],
        },
        SurveyCategories: [
          {
            Title: "테스트1",
            Cards: [],
          },
          {
            Title: "테스트2",
            Cards: [],
          },
        ],
        TipVideoCategory: {
          Title: "실전 팁 영상",
          Cards: [],
        },
    
        TipCategory: {
          Title: "실전 팁 칼럼",
          Cards: [],
        },
      },
      Login: {
        autoLogin: true,
        loggedIn: false,
        needRegister: false,
        user: null,
        idToken: null,
      },
      Privacy: {
        UserInfo: {
          name: "",
          birthDay: new Date(),
          image: "",
          sex: "female",
        },
        SpouseInfo: {
          name: "",
          birthDay: new Date(),
          image: "",
          sex: "male",
        }
      },
      Survey: {
        SurveyResultCards: [],
        SpouseResultCards: [],
      }
    } ,applyMiddleware(ReduxThunk))}>
      <PaperProvider theme={theme}>
        <Main />
      </PaperProvider>
    </ReduxProvider>
  );
}
