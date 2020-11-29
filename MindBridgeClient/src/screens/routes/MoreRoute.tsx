import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  View,
  Text,
  BackHandler,
  Image,
  Alert, Dimensions, Platform
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
      LoginState={this.props.LoginState}
    />
  );
  private info = () => <Info />;

  private tabs = () => [
    //{ title: "알림센터", route: this.info() },
    { title: "마이페이지", route: this.myPage() },
  ];

  componentDidMount() {
    this.props.RetrieveSpouseInfo();
  }

  componentWillUnmount() {
  }

  render() {

    //console.log("ReRendered");
    return (
      <View style={{ flex: 1, backgroundColor: "#FCDCFA", position: "relative" }}>
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
                label="배우자 계정"
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
                  this.setState({ email: "", dialog: false });
                }}
              >
                <Text allowFontScaling={false}>취소</Text>
              </Button>
              <Button
                labelStyle={{ margin: 10, color: "#F970B9" }}
                onPress={() => {
                  //console.log("match spouse");
                  this.props.MatchSpouse(this.state.email);
                  //console.log("match spouse end");
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
            <View style={{ position: "absolute", top: 5, right: 30 }}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  color: '#3A3A3A',
                  fontSize: 15,
                }}
                onPress={() => {
                  BackHandleService.Navigate("AppInfo");
                }}
              >
                앱 정보 보기
              </Text>
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
  LoginState: LoginState;
  CancelMembership: () => void;
};

function mapStateToProps(state: any) {
  return {
    PrivacyState: state.Privacy,
    LoginState: state.Login,
  };
}
function mapDispatchToProps(dispatch: Function) {
  return {
    Logout: () => {
      if(Platform.OS === "android")
      {
        dispatch(CombineAction.LogoutThunk());
      }
      else if(Platform.OS === "ios")
      {
        dispatch(CombineAction.AppleLogoutThunk());
      }

    },

    MatchSpouse: (email: string) => {
      dispatch(CombineAction.MatchSpouseThunk(email));
    },

    RetrieveSpouseInfo: () => {
      dispatch(CombineAction.RetrieveSpouseInfoThunk());
    },

    CancelMembership: () => {
      if(Platform.OS === "android")
      {
        dispatch(CombineAction.CancelMembershipThunk());
      }
      else
      {
        dispatch(CombineAction.AppleCancelMembershipThunk());
      }
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
            if (this.props.spouseInfo.name) {
              this.setState({ dialog: "spouse" });
            } else {
              alert("배우자가 등록되어 있지 않습니다.");
            }
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
        {
          text: "포인트/후원", onClick: () => {
            BackHandleService.Navigate("Point");
          }
        },
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
                  onPress: () => { },
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
                  onPress: () => { },
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
      <View style={{width: "100%", height: "100%"}}>
        {this.props.LoginState.loggedIn ?
          <View style={styles.pageLeftContainer}>
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
                        this.props.userInfo.image === "" ?
                        <View style={{width: 200, height: 200, borderRadius: 100, backgroundColor: '#ffc9e7'}}>
                        </View> 
                          :
                        <Image
                          style={{ width: 200, height: 200 }}
                          source={{ uri: this.props.userInfo.image }}
                        ></Image>
                      )}
                      {this.state.dialog == "spouse" &&  (
                        this.props.spouseInfo.image === "" ?
                        <View style={{width: 200, height: 200, borderRadius: 100, backgroundColor: '#ffc9e7'}}>
                        </View> 
                          :
                        <Image
                          style={{ width: 200, height: 200 }}
                          source={{ uri: this.props.spouseInfo.image }}
                        ></Image>
                      )}
                    </View>
                    {this.state.dialog == "user" && (
                      <View style={{ alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={styles.name}>{this.props.userInfo.name}</Text>
                        {/* <Text allowFontScaling={false}>{`생일 : ${this.props.userInfo.birthDay.getFullYear()}년 ${this.props.userInfo.birthDay.getMonth() + 1}월 ${this.props.userInfo.birthDay.getDate()}일`}</Text> */}
                      </View>
                    )}
                    {this.state.dialog == "spouse" && (
                      <View style={{ alignItems: 'center' }}>
                        <Text allowFontScaling={false} style={styles.name}>{this.props.spouseInfo.name}</Text>
                        {/* <Text allowFontScaling={false}>{`생일 : ${this.props.spouseInfo.birthDay.getFullYear()}년 ${this.props.spouseInfo.birthDay.getMonth() + 1}월 ${this.props.spouseInfo.birthDay.getDate()}일`}</Text> */}
                      </View>
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
                myState={this.props.userInfo.sex == "male" ? "" : ""}
                myImage={this.props.userInfo.image}
                spouseName={this.props.spouseInfo.name}
                spouseState={this.props.spouseInfo.sex == "male" ? "" : ""}
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
          :
          <View style = {styles.pageLeftContainer}>

            <View style = {{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center"}}>
            <Text allowFontScaling={false} style={{
              fontSize: 18
            }}>앱을 둘러보는 중입니다.</Text>
            <Text allowFontScaling={false} style={{fontSize: 12}}>로그인하셔서 알콩달콩 앱의 모든 기능을 사용해 보세요.</Text>
            <Button
            onPress={() => {
              BackHandleService.MainGoBack();
             }}
            mode="outlined"
            style={{
              borderColor: "#F970B9",
              backgroundColor: "#F970B911",
              borderWidth: 1,
              marginTop: 16,
            }}
            labelStyle={{ color: "#F970B9" }}
          >
            로그인 또는 시작하기
          </Button>
            </View>
          </View>
        }
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
  LoginState: LoginState;
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

const radius = 5;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: 'relative',
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
