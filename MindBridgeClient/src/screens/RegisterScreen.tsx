import React, { createRef, RefObject } from "react";
import {
  StyleSheet,
  View,
  Text,
  NativeSyntheticEvent,
  NativeTouchEvent,
  BackHandler,
  Platform,
  Image,
  Alert,
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
  TextInput,
} from "react-native-paper";
import { BackHandleService } from "../services/BackHandleService";
import CombineAction from "../CombineAction";
import { connect } from "react-redux";
import { LoginState } from "../StateTypes";
import { ThemeProvider } from "@react-navigation/native";
import { Picker, PickerIOS } from "@react-native-community/picker";
import { ScrollView } from "react-native-gesture-handler";

class RegisterScreen extends React.Component<Props> {

  // private yearItems: any[] = [];
  // private monthItems: any[] = [];
  // private dayItems: any[] = [];

  async componentWillUnmount() {
    if(this.cancel || Platform.OS === "ios") await this.props.Logout();
  }

  constructor(props: Props) {
    super(props);
    // for(var i = 1900; i <= new Date().getFullYear(); i++) {
    //   this.yearItems.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />)
    // }
    // for(var i = 1; i <= 12; i++) {
    //   this.monthItems.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />)
    // }
    // //console.log(this.getDays("2000", "1"));
    // for(var i = 1; i <= this.getDays("2000", "1"); i++) {
    //   this.dayItems.push(<Picker.Item key={i} label={`${i}`} value={`${i}`} />)
    // }
  }

  // private getDays(year: string, month: string): number{
  //   // month -1 이 일반적이나 month 라고 넣어서 그 다음 월의 0일을 가져오는 코드
  //   const date = new Date(parseInt(year), parseInt(month), 0);
  //   return date.getDate();
  // }

  private cancel: boolean = true;

  state = {
    year: "2000",
    month: "1",
    day: "1",
    value: "male",
    picked: false,

    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  render() {
    return (
      <View style={styles.main}>
        <View>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>안녕하세요</Text>
        {this.props.LoginState.user && (
          <Text>안녕하세요, {this.props.LoginState.user.name}님!</Text>
        )}
        <Text>알콩달콩 부부관계 테스트 앱에 오신 걸 환영합니다.</Text>

        {Platform.OS === 'ios' &&
        <View>
          <Text>회원 정보를 입력해주세요.</Text>
        <View style={{marginTop: 30}}>
          <TextInput  label="이름" 
                      allowFontScaling={false} 
                      numberOfLines={1} value={this.state.name} 
                      onChangeText={str => this.setState({name: str})}>
          </TextInput>
          <TextInput  label="이메일" 
                      allowFontScaling={false}
                      numberOfLines={1}
                      style={{marginTop: 10}}
                      value={this.state.email}
                      onChangeText={str => this.setState({email: str})}>
          </TextInput>
          <TextInput  secureTextEntry={true} 
                      label="비밀번호" 
                      allowFontScaling={false} 
                      numberOfLines={1} 
                      style={{marginTop: 10}} 
                      value={this.state.password}
                      onChangeText={str => this.setState({password: str})}>
          </TextInput>
          <TextInput  secureTextEntry={true}
                      label="비밀번호 확인" 
                      allowFontScaling={false} 
                      numberOfLines={1}
                      style={{marginTop: 10}} 
                      value={this.state.passwordRepeat}
                      onChangeText={str => this.setState({passwordRepeat: str})}>
          </TextInput>
        </View>
        </View>}

        </View>
        
        
        {/* <Text style={{ marginBottom: 20 }}>추가 정보를 입력해주세요.</Text>

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
        </Text> */}


        <Button
          onPress={() => {
            if(Platform.OS === "android")
            { 
              this.cancel = false;
              this.props.navigation.goBack();
              this.props.Register("", this.state.value);
            }
              
            else if (Platform.OS === "ios")
            {
              if(
                this.state.name &&
                this.state.email &&
                this.state.password &&
                this.state.passwordRepeat
              )
              {
                if(this.state.password !== this.state.passwordRepeat)
                {
                  Alert.alert("알콩달콩", "비밀번호가 일치하지 않습니다.");
                  return;
                }
                this.props.RegisterApple(this.state.email, this.state.password, this.state.name);
              }
              else
              {
                Alert.alert("알콩달콩", "입력되지 않은 정보가 있습니다.");
              }
              
            }

          }}
          mode="contained"
          labelStyle={{ color: "white" }}
          contentStyle={{padding: 6}}
        >
          회원가입
        </Button>
      </View>
    );
  }
}

type Props = StackScreenProps<StackParamList, "Register"> & {
  Logout: Function;
  Register: (birth: string, sex: string) => void;
  RegisterApple: (email: string, password: string, name: string) => void;
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
      if(Platform.OS === "android")
        dispatch(CombineAction.LogoutThunk());
      else
        dispatch(CombineAction.AppleLogoutThunk());
    },

    Register: (birth: string, sex: string): void => {
      dispatch(CombineAction.RegisterThunk(birth, sex));
    },

    RegisterApple: (email: string, password: string, name: string): void => {
      dispatch(CombineAction.AppleRegisterThunk(email, password, name));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);

const styles = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "whitesmoke",

    flexDirection: "column",
    justifyContent: "space-between"
  },
});
