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
import { LoginState } from "../../StateTypes";
import CombineAction from "../../CombineAction";
import { connect } from "react-redux";

class MoreRoute extends React.Component<Props> {

  private myPage = <MyPage onLogout={this.props.Logout}
                           myName={this.props.LoginState.user?.givenName ?? ""}
                           spouseName="망둥이"
                           sex="male"
                    />;
  private info = <Info />;

  private tabs = [
    { title: "알림센터", route: this.info },
    { title: "마이페이지", route: this.myPage },
  ];


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
        <View style={styles.statusBar}></View>
        <Background Title="더보기">
          <View style={styles.main}>
            <View style={styles.tabContainer}>
              <Tab
                tabs={this.tabs}
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

type Props = StackScreenProps<StackParamList, "Main"> & {
  Logout: Function;
  LoginState: LoginState;
};

function mapStateToProps(state: any) {
  return {
    LoginState: state.Login,
  };
}
function mapDispatchToProps(dispatch: Function) {
  return {
    Logout: () => {
      dispatch(CombineAction.LogoutThunk());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreRoute);


class MyPage extends React.Component<MyPageProps> {
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
      { text: "자료실", onClick: () => {} },
    ],

    [
      { text: "로그아웃", onClick: () => {
        BackHandleService.MainGoBack();
        this.props.onLogout();
        
      } },
      { text: "회원 탈퇴", onClick: () => {} },
    ],
  ];

  render() {
    return (
      <View style={styles.pageRightContainer}>
        <View style={styles.cardMargin}>
          <Profile
            myName={this.props.myName}
            myState={this.props.sex == "male"? "남편" : "아내"} 
            spouseName={this.props.spouseName}
            spouseState={this.props.sex == "female"? "남편" : "아내"} 
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
type MyPageProps = { onLogout: Function, myName: string, spouseName: string, sex: "male" | "female" };

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
      { text: "앱 정보", onClick: () => {} },
    ],

    [
      { text: "포인트 사용", onClick: () => {} },
      { text: "포인트 충전", onClick: () => {} },
    ],
  ];

  render() {
    return (
      <View style={styles.pageLeftContainer}>
        {this.buttonInfo.map((val, ind) => (
          <View style={styles.cardMargin} key={ind}>
            <DoubleCard upperButton={val[0]} downerButton={val[1]} />
          </View>
        ))}
      </View>
    );
  }
}

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
