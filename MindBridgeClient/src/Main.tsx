import React from "react";
import { createStackNavigator, HeaderTitle, StackHeaderTitleProps } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen        from "./screens/LoginScreen";
import MainScreen         from "./screens/MainScreen";
import TestScreen         from "./screens/TestScreen";
import SurveyWebScreen    from "./screens/SurveyWebScreen";
import SurveyResultScreen from "./screens/SurveyResultScreen";
import LogoTitle from "./components/LogoTitle";
import SurveyHistoryScreen from "./screens/SurveyHistoryScreen";

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#FCDCFA'
        },
      }}>
        <Stack.Screen name="Login"        component={LoginScreen} 
                      options={{
                        headerShown: false,
                      }}
        />
        <Stack.Screen name="Main"         component={MainScreen}
                      options={{
                        headerShown: false,
                      }}
        />
        <Stack.Screen name="Test"         component={TestScreen} />
        <Stack.Screen name="SurveyWeb"    component={SurveyWebScreen} 
                      options={{
                        headerTitle: "테스트"
                      }}
        />
        <Stack.Screen name="SurveyResult" component={SurveyResultScreen} 
                      options={{
                        headerTitle: "테스트 결과"
                      }}
        />
        <Stack.Screen name="SurveyHistory" component={SurveyHistoryScreen}
                      options={{
                        headerTitle: "테스트 기록"
                      }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


