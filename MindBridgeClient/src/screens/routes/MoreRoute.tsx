import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Image,
  Alert,
} from "react-native";
import DoubleCard from "../../components/DoubleCard";
import Profile from "../../components/Profile";

import Tab from "../../components/Tab";
import StackParamList from "../StackParamList";
import Background from "../../components/Background";
import { BackHandleService } from "../../services/BackHandleService";
import { LoginState, PrivacyState, UserInfo } from "../../StateTypes";
import CombineAction from "../../CombineAction";
import { connect } from "react-redux";
import {
  Dialog,
  TextInput,
  Button,
  Portal,
  DefaultTheme,
} from "react-native-paper";

class MoreRoute extends React.Component<Props> {
  state = {
    dialog: false,
    email: "",
  };

  private myPage = () => (
    <MyPage
      onLogout={this.props.Logout}
      userInfo={this.props.PrivacyState.UserInfo}
      spouseInfo={this.props.PrivacyState.SpouseInfo}
      CancelMembership={this.props.CancelMembership}
      onMatch={() => {
        this.setState({ dialog: true });
      }}
    />
  );
  private info = () => <Info />;

  private tabs = () => [
    { title: "알림센터", route: this.info() },
    { title: "마이페이지", route: this.myPage() },
  ];

  componentDidMount() {
    this.props.RetrieveSpouseInfo();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA" }}>
        <Portal>
          <Dialog
            visible={this.state.dialog}
            onDismiss={() => {
              this.setState({ dialog: false });
              this.setState({ email: "" });
            }}
          >
            <Dialog.Title>배우자 등록</Dialog.Title>
            <Dialog.Content>
              <Text allowFontScaling={false} >
                배우자가 알콩달콩 앱에 가입되어 있어야 합니다.
              </Text>
              <TextInput
                label="배우자 구글 계정"
                mode="outlined"
                onChangeText={(value) => {
                  this.setState({ email: value });
                }}
                style={{ width: "100%" }}
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: "#F060A9",
                  },
                }}
              ></TextInput>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                labelStyle={{ margin: 10, marginRight: 30, color: "#F970B9" }}
                onPress={() => {
                  this.setState({ email: "" });
                  this.setState({ dialog: false });
                }}
              >
                <Text allowFontScaling={false}>취소</Text>
              </Button>
              <Button
                labelStyle={{ margin: 10, color: "#F970B9" }}
                onPress={() => {
                  console.log("match spouse");
                  this.props.MatchSpouse(this.state.email);
                  console.log("match spouse end");
                  this.setState({ dialog: false });
                }}
              >
                <Text allowFontScaling={false}>확인</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View style={styles.statusBar}></View>
        <Background Title="">
          <View style={styles.main}>
            <View style={styles.tabContainer}>
              <Tab
                tabs={this.tabs()}
                style={{ marginLeft: 20 }}
                tabWidth={100}
                onChange={(tab) => {
                  if (tab == 1) this.props.RetrieveSpouseInfo();
                }}
              />
            </View>
          </View>
        </Background>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Main"> & {
  Logout: () => void;
  RetrieveSpouseInfo: () => void;
  MatchSpouse: (email: string) => void;
  PrivacyState: PrivacyState;
  CancelMembership: () => void;
};

function mapStateToProps(state: any) {
  return {
    PrivacyState: state.Privacy,
  };
}
function mapDispatchToProps(dispatch: Function) {
  return {
    Logout: () => {
      dispatch(CombineAction.LogoutThunk());
    },

    MatchSpouse: (email: string) => {
      dispatch(CombineAction.MatchSpouseThunk(email));
    },

    RetrieveSpouseInfo: () => {
      dispatch(CombineAction.RetrieveSpouseInfoThunk());
    },

    CancelMembership: () => {
      dispatch(CombineAction.CancelMembership());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MoreRoute);

class MyPage extends React.Component<MyPageProps> {
  state = {
    dialog: "none",
  };

  private buttonInfo: [
    { text: string; onClick: Function },
    { text: string; onClick: Function }
  ][] = [
    [
      {
        text: "내 프로필",
        onClick: () => {
          this.setState({ dialog: "user" });
        },
      },
      {
        text: "배우자 프로필",
        onClick: () => {
          this.setState({ dialog: "spouse" });
        },
      },
    ],

    [
      {
        text: "테스트 결과 보기",
        onClick: () => {
          BackHandleService.Navigate("SurveyHistory");
        },
      },
      { text: "자료실", onClick: () => {
        BackHandleService.Navigate("Reference");
      } },
    ],

    [
      {
        text: "로그아웃",
        onClick: () => {
          Alert.alert(
            "알콩달콩",
            "정말로 로그아웃하시겠습니까?",
            [
              {
                text: "취소",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "확인",
                onPress: () => {
                  BackHandleService.MainGoBack();
                  this.props.onLogout();
                },
              },
            ],
            { cancelable: false }
          );
        },
      },
      {
        text: "회원 탈퇴",
        onClick: () => {
          Alert.alert(
            "알콩달콩",
            "정말로 탈퇴하시겠습니까?",
            [
              {
                text: "취소",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "확인",
                onPress: () => {
                  BackHandleService.MainGoBack();
                  this.props.CancelMembership();
                },
              },
            ],
            { cancelable: false }
          );
        },
      },
    ],
  ];

  render() {
    return (
      <View style={styles.pageRightContainer}>
        <Portal>
          <Dialog
            visible={this.state.dialog !== "none"}
            onDismiss={() => {
              this.setState({ dialog: "none" });
            }}
          >
            <Dialog.Title>프로필</Dialog.Title>
            <Dialog.Content>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    overflow: "hidden",
                    marginBottom: 20,
                  }}
                >
                  {this.state.dialog == "user" && (
                    <Image
                      style={{ width: 200, height: 200 }}
                      source={{ uri: this.props.userInfo.image }}
                    ></Image>
                  )}
                  {this.state.dialog == "spouse" && (
                    <Image
                      style={{ width: 200, height: 200 }}
                      source={{ uri: this.props.spouseInfo.image }}
                    ></Image>
                  )}
                </View>
                {this.state.dialog == "user" && (
                  <Text allowFontScaling={false} style={styles.name}>{this.props.userInfo.name}</Text>
                )}
                {this.state.dialog == "spouse" && (
                  <Text allowFontScaling={false} style={styles.name}>{this.props.spouseInfo.name}</Text>
                )}
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                labelStyle={{ margin: 10, marginRight: 30, color: "#F970B9" }}
                onPress={() => {
                  this.setState({ dialog: "none" });
                }}
              >
                <Text allowFontScaling={false}>닫기</Text>
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>

        <View style={styles.cardMargin}>
          <Profile
            myName={this.props.userInfo.name}
            myState={this.props.userInfo.sex == "male" ? "남편" : "아내"}
            myImage={this.props.userInfo.image}
            spouseName={this.props.spouseInfo.name}
            spouseState={this.props.spouseInfo.sex == "male" ? "남편" : "아내"}
            spouseImage={this.props.spouseInfo.image}
            onMatch={this.props.onMatch}
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
type MyPageProps = {
  onLogout: Function;
  userInfo: UserInfo;
  spouseInfo: UserInfo;
  onMatch: () => void;
  CancelMembership: () => void;
};

class Info extends React.Component {
  private buttonInfo: [
    { text: string; onClick: Function },
    { text: string; onClick: Function }
  ][] = [
    [
      {
        text: "공지사항",
        onClick: () => {
          BackHandleService.Navigate("Announce");
        },
      },
      {
        text: "자주 묻는 질문",
        onClick: () => {
          BackHandleService.Navigate("FAQ");
        },
      },
    ],

    [
      {
        text: "문의하기",
        onClick: () => {
          BackHandleService.Navigate("Ask");
        },
      },
      {
        text: "앱 정보",
        onClick: () => {
          BackHandleService.Navigate("AppInfo");
        },
      },
    ],

    [
      {
        text: "포인트 사용",
        onClick: () => {
          BackHandleService.Navigate("PointUse");
        },
      },
      {
        text: "포인트 충전",
        onClick: () => {
          BackHandleService.Navigate("PointCharge");
        },
      },
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

  name: {
    fontSize: 20,
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
