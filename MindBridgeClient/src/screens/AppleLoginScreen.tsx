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
    Alert,
} from "react-native";
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
import EnvGetGoogleService from "../services/EnvGetGoogleService";
import * as LoginActions from "../actions/LoginActions";

class AppleLoginScreen extends React.Component<Props> {

    private onLoggedInLayout = () => {
        this.props.navigation.navigate("Main");
    }

    state = {
        email: "",
        password: "",
    }

    render() {
        return (
            <View style={styles.main}>
                <View style={{width: "100%", flexDirection: "row", justifyContent: "center"}}>
                    <Text allowFontScaling={false}>알콩달콩 앱에 로그인</Text>
                </View>

                <TextInput
                    label="이메일"
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={{ marginTop: 30 }}
                    value={this.state.email}
                    onChangeText={str => this.setState({ email: str })}>
                </TextInput>

                <TextInput
                    secureTextEntry={true}
                    label="비밀번호"
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={{ marginTop: 10 }}
                    value={this.state.password}
                    onChangeText={str => this.setState({ password: str })}>
                </TextInput>
                {this.props.LoginState.loggedIn ? (
                    <View onLayout={this.onLoggedInLayout} style={{ marginTop: 50, flexDirection: "row", justifyContent: "center" }}>
                        <Text allowFontScaling={false} >로그인 완료</Text>
                    </View>
                ) :
                    (
                        <Button
                            mode="contained"
                            labelStyle={{ color: "white" }}
                            style={{ marginTop: 50 }}
                            onPress={() => {
                                this.props.AppleLogin(
                                    this.state.email, this.state.password
                                );
                            }}
                            contentStyle={{ padding: 6 }}
                        >
                            <Text allowFontScaling={false}>로그인</Text>
                        </Button>
                        
                    )}

                    <Button
                        style={{
                          backgroundColor: "transparent",
                          marginTop: 10,
                        }}
                        contentStyle={{padding: 6}}
                        onPress={() => { if(this.state.email === "") {
                            Alert.alert("알콩달콩", "이메일을 입력해주세요.");
                        } else {
                            this.props.EmailCheck(this.state.email);
                        }}}
                      >
                        <Text allowFontScaling={false} style={{ color: "black" }}>인증 메일 보내기</Text>
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "transparent",
                          marginTop: 10,
                        }}
                        contentStyle={{padding: 6}}
                        onPress={() => { if(this.state.email === "") {
                            Alert.alert("알콩달콩", "이메일을 입력해주세요.");
                        } else {
                            this.props.ChangePassword(this.state.email);
                        }}}
                      >
                        <Text allowFontScaling={false} style={{ color: "black" }}>인증 메일 보내기</Text>
                      </Button>
            </View>
        );
    }
}

type Props = StackScreenProps<StackParamList, "AppleLogin"> & {
    AppleLogin: (email: string, password: string) => void
    LoginState: LoginState;
    EmailCheck: (email: string) => void;
    ChangePassword: (email: string) => void;
};

function mapStateToProps(state: any) {
    return {
        LoginState: state.Login,
    };
}
function mapDispatchToProps(dispatch: Function) {
    return {
        AppleLogin: (email: string, password: string) => {
            dispatch((CombineAction).AppleLoginThunk(email, password));
        },
        EmailCheck: (email: string) => {
          dispatch(CombineAction.AppleEmailValidationThunk(email));
        },
        ChangePassword: (email: string) => {
            dispatch(CombineAction.ApplePasswordChangeThunk(email));
          }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppleLoginScreen);

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
        justifyContent: "center"
    },
});
