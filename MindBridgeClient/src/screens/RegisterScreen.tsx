import React from "react";
import {
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  NativeTouchEvent,
  BackHandler,
  Platform,
  Image,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import StackParamList from "./StackParamList";
import { WebView } from "react-native-webview";
import {
  ActivityIndicator,
  DefaultTheme,
  RadioButton,
  ToggleButton,
  Button,
} from "react-native-paper";
import { BackHandleService } from "../services/BackHandleService";
import CombineAction from "../CombineAction";
import { connect } from "react-redux";
import { LoginState } from "../StateTypes";
import { ThemeProvider } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

class RegisterScreen extends React.Component<Props> {
  async componentWillUnmount() {
    await this.props.Logout();
  }

  state = {
    date: "",
    show: false,
    value: "male",
  };

  private dateProcess(date: Date) {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  }

  private onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate? this.dateProcess(selectedDate as Date) : this.state.date;
    this.setState({ show: Platform.OS === "ios" });
    this.setState({ date: currentDate });
  };

  render() {
    return (
      <View style={styles.main}>
        <Text style={{ fontSize: 30, marginBottom: 10 }}>안녕하세요</Text>
        {this.props.LoginState.user && (
          <Text>안녕하세요, {this.props.LoginState.user.name}님!</Text>
        )}
        <Text>알콩달콩 부부관계 테스트 앱에 오신 걸 환영합니다.</Text>
        <Text style={{ marginBottom: 20 }}>추가 정보를 입력해주세요.</Text>

        <Text style={{ marginTop: 10 }}>성</Text>
        <RadioButton.Group
          onValueChange={(value) => {
            this.setState({ value });
          }}
          value={this.state.value}
        >
          <RadioButton.Item label="남자" value="male" />
          <RadioButton.Item label="여자" value="female" />
        </RadioButton.Group>
        <Text style={{ marginTop: 10, marginBottom: 20 }}>생일</Text>

        <Text style={{ marginBottom: 10 }}>
          {this.state.date ?? "생일을 선택해주세요."}
        </Text>

        {Platform.OS === "android" && (
          <Button
            onPress={() => {
              this.setState({ show: true });
            }}
            mode="outlined"
            style={{
              borderColor: "#F970B9",
              backgroundColor: "#F970B911",
              borderWidth: 1,
            }}
            labelStyle={{ color: "#F970B9" }}
          >
            선택하기
          </Button>
        )}

        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(2000, 1, 1)}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            style={{ backgroundColor: "red" }}
          ></DateTimePicker>
        )}

        <View style={styles.bottom}>
          <Text style={{ marginBottom: 20 }}>
            정보 입력을 제대로 하셨는지 꼭 확인하시고 아래의 회원가입 버튼을
            눌러주세요.
          </Text>
          <Button
            onPress={() => {
              this.props.navigation.goBack();
              this.props.Register(this.state.date, this.state.value)
            }}
            mode="contained"
            disabled={this.state.date === ""}
            labelStyle={{ color: "white" }}
          >
            회원가입
          </Button>
        </View>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Register"> & {
  Logout: Function;
  Register: (birth: string, sex: string) => void;
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

    Register: (birth: string, sex: string): void => {
      dispatch(CombineAction.RegisterThunk(birth, sex));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  main: {
    position: "relative",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    backgroundColor: "whitesmoke",
  },

  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    marginLeft: 20,
    width: "100%",
    marginBottom: 40,
  },
});
