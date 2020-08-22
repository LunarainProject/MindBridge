import { ThemeProvider } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  TextInput,
} from "react-native-paper";
import { connect } from "react-redux";
import { LoginThunk } from "../actions/LoginActions";
import CombineAction from "../CombineAction";
import { LoginState } from "../StateTypes";
import StackParamList from "./StackParamList";
import EnvGetGoogleService from "../services/EnvGetGoogleService";

class LoginScreen extends React.Component<Props> {
  state = {
    id: "",
    password: "",
    checked: true,
    registered: true,
  };

  private onNeedRegisterLayout = () => {
    this.props.navigation.navigate("Register");
  };

  private onLogin = () => {
    this.props.Login();
  }

  private onLoggedInLayout = () => {
    this.props.navigation.navigate("Main");
  }

  async componentDidMount() {
    
    console.log('login init');

    try {
      await EnvGetGoogleService().initAsync();
    } catch(e) {
      console.log("initialization error: ", e);
    }

    if (this.props.LoginState.autoLogin) {
      setTimeout(() => {
        this.props.AutoLogin();
      }, 800);
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <Text allowFontScaling={false} style={{ fontSize: 30, marginBottom: 20 }}>환영합니다</Text>
        <Image
          style={{ width: width * 0.6, height: width * 0.6 }}
          resizeMode="cover"
          source={require("../drawables/logo_high.png")}
        ></Image>

        <View style={styles.footer}>
          <View style={{ marginBottom: 40 }}>

            {/* 회원가입 창으로 넘어가기 */
              this.props.LoginState.needRegister && <View onLayout={this.onNeedRegisterLayout} />
            }

            {/* 로그인되었을 때 */
            this.props.LoginState.loggedIn? (
              <View onLayout={this.onLoggedInLayout}>
                <Text allowFontScaling={false} >로그인 완료</Text>
              </View>
            ) :
            /* 로그인되지 않았을 때 */
            this.props.LoginState.autoLogin ? (
              /* 자동 로그인 시 */
              <View>
                <ActivityIndicator size="small"></ActivityIndicator>
                <View style={{ marginTop: 5 }}>
                  <Text allowFontScaling={false} >자동 로그인 중입니다</Text>
                </View>
              </View>
            ) : 
            (
              /* 자동 로그인 실패 시 */
              <Button
                style={{ backgroundColor: "white" }}
                onPress={this.onLogin}
              >
                <Text allowFontScaling={false}>Google 계정으로 시작하기</Text>
              </Button>
            )}
          </View>
          <Text allowFontScaling={false} >부부의 행복한 사랑을 응원합니다.</Text>
          <Text allowFontScaling={false} >-알콩달콩 부부학교-</Text>
        </View>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Login"> & {
  AutoLogin: Function;
  Login: Function;
  LoginState: LoginState;
};

function mapStateToProps(state: any) {
  return {
    LoginState: state.Login,
  };
}
function mapDispatchToProps(dispatch: Function) {
  return {
    AutoLogin: () => {
      dispatch(CombineAction.AutoLoginThunk());
    },

    Login: () => {
      dispatch(CombineAction.LoginThunk());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FCDCFA",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  mainInner: {
    width: width,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  loginCont: {
    width: width - 40,
    padding: 10,
  },

  catchphrase: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: width,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  autoLogin: {
    flexDirection: "row",
    alignItems: "center",
  },

  footer: {
    position: "absolute",
    width: "100%",
    height: 180,
    bottom: 0,
    left: 0,
    alignItems: "center",
  },
});
