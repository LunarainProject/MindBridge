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
import { Picker, PickerIOS } from "@react-native-community/picker";
import { ScrollView } from "react-native-gesture-handler";

class RegisterScreen extends React.Component<Props> {

  private yearItems: any[] = [];
  private monthItems: any[] = [];
  private dayItems: any[] = [];

  async componentWillUnmount() {
    if(this.cancel) await this.props.Logout();
  }

  constructor(props: Props) {
    super(props);
    for(var i = 1900; i <= new Date().getFullYear(); i++) {
      this.yearItems.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />)
    }
    for(var i = 1; i <= 12; i++) {
      this.monthItems.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />)
    }
    console.log(this.getDays("2000", "1"));
    for(var i = 1; i <= this.getDays("2000", "1"); i++) {
      this.dayItems.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />)
    }
  }

  private getDays(year: string, month: string): number{
    // month -1 이 일반적이나 month 라고 넣어서 그 다음 월의 0일을 가져오는 코드
    const date = new Date(parseInt(year), parseInt(month), 0);
    return date.getDate();
  }

  private cancel: boolean = true;

  state = {
    year: "2000",
    month: "1",
    day: "1",
    value: "male",
    picked: false,
  };



  render() {
    return (
      <ScrollView style={styles.main}>
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
          { this.state.picked? 
            `${this.state.year}.${this.state.month}.${this.state.day}` :
            "생일을 선택해주세요."
          }
        </Text>

        <View style={{flexDirection: 'row', width: "100%"}}>
          <View style={{borderWidth: 1, borderColor: 'pink', width: "33%", }}>
            <Picker
            selectedValue={this.state.year}
            style={{width: "100%"}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({year: itemValue, picked: true,});
              this.dayItems = [];
              for(var i = 1; i <= this.getDays(itemValue as string, this.state.month); i++) {
                this.dayItems.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />);
              }
            }
            }>
              {this.yearItems}
          </Picker>
          </View>
          <View style={{borderWidth: 1, borderColor: 'pink', width: "33%", }}>
            <Picker
            selectedValue={this.state.month}
            style={{width: "100%"}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({month: itemValue, picked: true,});
              this.dayItems = [];
              for(var i = 1; i <= this.getDays(this.state.year, itemValue as string); i++) {
                this.dayItems.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />);
              }
            }
            }>
              {this.monthItems}
          </Picker>
          </View><View style={{borderWidth: 1, borderColor: 'pink', width: "33%",}}>
            <Picker
            selectedValue={this.state.day}
            style={{width: "100%"}}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({day: itemValue, picked: true,});
            }
            }>
              {this.dayItems}
          </Picker>
          </View>
        </View>
        <Text style={{ marginTop: 60, marginBottom: 20}}>
          정보 입력을 제대로 하셨는지 꼭 확인하시고 아래의 회원가입 버튼을
          눌러주세요.
        </Text>
        <Button
          onPress={() => {
            this.cancel = false;
            this.props.navigation.goBack();
            this.props.Register(`${this.state.year}.${this.state.month}.${this.state.day}`, this.state.value)
          }}
          mode="contained"
          disabled={!this.state.picked}
          labelStyle={{ color: "white" }}
        >
          회원가입
        </Button>
      </ScrollView>
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
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    backgroundColor: "whitesmoke",
  },

  bottom: {
    marginTop: 20,
    marginLeft: 20,
    width: "100%",
    marginBottom: 40,
  },
});
