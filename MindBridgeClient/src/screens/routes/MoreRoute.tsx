import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import Constants from "expo-constants";
import { StyleSheet, View, Text, BackHandler } from "react-native";
import DoubleCard from "../../components/DoubleCard";
import Profile from "../../components/Profile";

import Tab from "../../components/Tab";
import StackParamList from "../StackParamList";
import Background from "../../components/Background";
import { BackHandleService } from "../../services/BackHandleService";

export default class MoreRoute extends React.Component<Props> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
        <View style={styles.statusBar}></View>
        <Background Title="더보기">
          <View style={styles.main}>
            <View style={styles.tabContainer}>
              <Tab
                tabs={tabs}
                style={{ marginLeft: 20 }}
                tabWidth={100}
                onChange={() => {}}
              />
            </View>
          </View>
        </Background>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main">;

class MyPage extends React.Component {
  private buttonInfo: [
    { text: string; onClick: Function },
    { text: string; onClick: Function }
  ][] = [
    [
      { text: "내 프로필", onClick: () => {} },
      { text: "배우자 프로필", onClick: () => {} },
    ],

    [
      {
        text: "테스트 결과 보기",
        onClick: () => {
          BackHandleService.Navigate("SurveyHistory");
        },
      },
      { text: "My 포인트", onClick: () => {} },
    ],

    [
      { text: "로그아웃", onClick: () => {} },
      { text: "회원 탈퇴", onClick: () => {} },
    ],
  ];

  render() {
    return (
      <View style={styles.pageLeftContainer}>
        <View style={styles.cardMargin}>
          <Profile
            myName="망둥이1"
            myState="남편"
            spouseName="망둥이2"
            spouseState="아내"
          />
        </View>
        {this.buttonInfo.map((val, ind) => (
          <View style={styles.cardMargin} key={ind}>
            <DoubleCard upperButton={val[0]} downerButton={val[1]} />
          </View>
        ))}
      </View>
    );
  }
}

class Info extends React.Component {
  private buttonInfo: [
    { text: string; onClick: Function },
    { text: string; onClick: Function }
  ][] = [
    [
      { text: "공지사항", onClick: () => {} },
      { text: "자주 묻는 질문", onClick: () => {} },
    ],

    [
      { text: "문의하기", onClick: () => {} },
      { text: "버전 정보", onClick: () => {} },
    ],

    [
      { text: "후원하기", onClick: () => {} },
      { text: "후원 내역 보기", onClick: () => {} },
    ],

    [
      { text: "부부학교 신청하기", onClick: () => {} },
      { text: "설정", onClick: () => {} },
    ],
  ];

  render() {
    return (
      <View style={styles.pageRightContainer}>
        {this.buttonInfo.map((val, ind) => (
          <View style={styles.cardMargin} key={ind}>
            <DoubleCard upperButton={val[0]} downerButton={val[1]} />
          </View>
        ))}
      </View>
    );
  }
}

const myPage = <MyPage />;
const info = <Info />;

const tabs = [
  { title: "마이페이지", route: myPage },
  { title: "알림센터", route: info },
];

const radius = 10;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },

  statusBar: {
    backgroundColor: "#FCDCFA",
    width: "100%",
    height: Constants.statusBarHeight,
  },

  tabContainer: {
    flex: 1,
  },

  cardMargin: {
    marginBottom: 15,
  },

  pageLeftContainer: {
    padding: 10,
    marginLeft: 20,
    marginBottom: 10,
    borderTopLeftRadius: radius,
    borderBottomLeftRadius: radius,
    flex: 1,
    backgroundColor: "whitesmoke",
  },

  pageRightContainer: {
    padding: 10,
    marginRight: 20,
    marginBottom: 10,
    borderTopRightRadius: radius,
    borderBottomRightRadius: radius,
    flex: 1,
    backgroundColor: "whitesmoke",
  },
});
