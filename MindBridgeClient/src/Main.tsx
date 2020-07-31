import React from "react";
import { createStackNavigator, HeaderTitle, StackHeaderTitleProps } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen        from "./screens/LoginScreen";
import MainScreen         from "./screens/MainScreen";
import TestScreen         from "./screens/TestScreen";
import SurveyWebScreen    from "./screens/SurveyWebScreen";
import SurveyResultScreen from "./screens/SurveyResultScreen";
import LogoTitle from "./components/LogoTitle";

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
        <Stack.Screen name="SurveyWeb"    component={SurveyWebScreen} />
        <Stack.Screen name="SurveyResult" component={SurveyResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


