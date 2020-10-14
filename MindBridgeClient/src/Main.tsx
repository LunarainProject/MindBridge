import React from "react";
import { createStackNavigator, HeaderTitle, StackHeaderTitleProps } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "./screens/LoginScreen";
import MainScreen from "./screens/MainScreen";
import TestScreen from "./screens/TestScreen";
import SurveyWebScreen from "./screens/SurveyWebScreen";
import SurveyResultScreen from "./screens/SurveyResultScreen";
import LogoTitle from "./components/LogoTitle";
import SurveyHistoryScreen from "./screens/SurveyHistoryScreen";
import RegisterScreen from "./screens/RegisterScreen";
import TipWebScreen from "./screens/TipWebScreen";
import VideoWebScreen from "./screens/VideoWebScreen";
import AnnounceScreen from "./screens/subScreens/AnnounceScreen";
import AppInfoScreen from "./screens/subScreens/AppInfoScreen";
import AskScreen from "./screens/subScreens/AskScreen";
import FAQScreen from "./screens/subScreens/FAQScreen";
import PointScreen from "./screens/subScreens/PointScreen";
import ReferenceScreen from "./screens/subScreens/ReferenceScreen";
import SpouseHistoryScreen from "./screens/SpouseHistoryScreen";

const Stack = createStackNavigator();

export default class Main extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#FCDCFA'
          },
        }}>
          <Stack.Screen name="Login" component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Register" component={RegisterScreen}
            options={{
              headerTitle: "회원가입"
            }}
          />
          <Stack.Screen name="Main" component={MainScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Test" component={TestScreen} />
          <Stack.Screen name="SurveyWeb" component={SurveyWebScreen}
            options={{
              headerTitle: "테스트"
            }}
          />
          <Stack.Screen name="VideoWeb" component={VideoWebScreen}
            options={{
              headerTitle: "실전 부부 팁"
            }}
          />
          <Stack.Screen name="TipWeb" component={TipWebScreen}
            options={{
              headerTitle: "실전 부부 팁"
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
          <Stack.Screen name="SpouseHistory" component={SpouseHistoryScreen}
            options={{
              headerTitle: "배우자의 테스트 기록"
            }}
          />

          {/* subscreens */}
          <Stack.Screen name="Announce" component={AnnounceScreen}
            options={{
              headerTitle: "공지사항"
            }}
          />
          <Stack.Screen name="AppInfo" component={AppInfoScreen}
            options={{
              headerTitle: "앱 정보"
            }}
          />
          <Stack.Screen name="Ask" component={AskScreen}
            options={{
              headerTitle: "문의하기"
            }}
          />
          <Stack.Screen name="FAQ" component={FAQScreen}
            options={{
              headerTitle: "자주 묻는 질문"
            }}
          />
          <Stack.Screen name="Point" component={PointScreen}
            options={{
              headerTitle: "My 포인트"
            }}
          />
          <Stack.Screen name="Reference" component={ReferenceScreen}
            options={{
              headerTitle: "자료실"
            }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}


