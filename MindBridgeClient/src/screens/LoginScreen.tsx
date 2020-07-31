import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import {
  ActivityIndicator,
  Button,
  Checkbox,
  TextInput,
} from "react-native-paper";
import { connect } from "react-redux";
import CombineAction from "../CombineAction";
import { LoginState } from "../StateTypes";
import StackParamList from "./StackParamList";

class LoginScreen extends React.Component<Props> {
  state = {
    id: "",
    password: "",
    checked: true,
    registered: true,
  };

  private onRegister = (): void => {
    this.props.navigation.navigate('Main');
  }
  
  componentDidMount() {
    if(!this.props.LoginState.LoggedOut) {
        setTimeout(()=> {
        this.props.AutoLogin();
      }, 2000);
    }
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={{ fontSize: 30, marginBottom: 20 }}>환영합니다</Text>
        <Image
          style={{ width: width * 0.6, height: width * 0.6 }}
          resizeMode="cover"
          source={require("../drawables/logo_high.png")}
        ></Image>

        <View style={styles.footer}>
          <View style={{ marginBottom: 50 }}>
            {this.props.LoginState.LoginFailed ? (
              <Button onPress={this.onRegister}>처음이신가요? 시작하기</Button>
            ) : (
              <View>
                <ActivityIndicator size="small"></ActivityIndicator>
                <View style={{ marginTop: 5 }}>
                  <Text>자동 로그인 중입니다</Text>
                </View>
              </View>
            )}
          </View>
          <Text>부부의 행복한 사랑을 응원합니다.</Text>
          <Text>-알콩달콩 부부학교-</Text>
        </View>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Login"> & {
  AutoLogin: Function,
  LoginState: LoginState;
};


function mapStateToProps(state: any) {
  return {
    LoginState: state.Login,
  };
};
function mapDispatchToProps(dispatch: Function) {
  return {
    AutoLogin: () => {
      CombineAction.AutoLoginThunk()(dispatch);
    },
  }
};

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
