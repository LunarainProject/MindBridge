import IAction from "./IAction";
import ActionTypes from "./ActionTypes";
import { GoogleUser } from "expo-google-app-auth";
import ServerService from "../services/ServerService";
import { LoginState } from "../StateTypes";
import EnvGetGoogleService from "../services/EnvGetGoogleService";
import { indigo100 } from "react-native-paper/lib/typescript/src/styles/colors";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';

export type LoginActions = LoginAction | LogoutAction | RegisterAction;

export class RegisterAction implements IAction {
  type: string = "";
}
function _Register(): RegisterAction {
  return {
    type: ActionTypes.REGISTER,
  };
}
export const RegisterThunk = (birth: string, sex: string) => async (
  dispatch: Function,
  getState: Function
) => {
  console.log((getState().Login as LoginState).idToken);
  await ServerService.RegisterAccount(
    (getState().Login as LoginState).idToken,
    birth,
    sex
  );
  dispatch(_Register());
};

export class LogoutAction implements IAction {
  type: string = "";
}
function _Logout(): LogoutAction {
  return {
    type: ActionTypes.LOGOUT,
  };
}
export const LogoutThunk = () => async (dispatch: Function) => {
  EnvGetGoogleService().signOutAsync();
  dispatch(_Logout());
};

export class LoginAction implements IAction {
  type: string = "";
  loggedIn: boolean = false;
  autoLogin: boolean = true;
  needRegister: boolean = false;
  user: GoogleUser | null = null;
  idToken: string | null = null;
}
function _Login(
  loggedIn: boolean,
  autoLogin: boolean,
  needRegister: boolean,
  user: GoogleUser | null,
  idToken: string | null
): LoginAction {
  return {
    type: ActionTypes.LOGIN,
    loggedIn,
    autoLogin,
    needRegister,
    user,
    idToken,
  };
}

export const LoginThunk = () => async (dispatch: Function) => {
  let { user, idToken } = await EnvGetGoogleService().signInAsync();
  if (user === undefined) user = null;

  let loggedIn: boolean;
  let autoLogin: boolean;
  let needRegister: boolean;

  console.log(user, idToken);

  if (user !== null) {
    //시작하기 성공
    const resp = await ServerService.CheckUserRegistered(idToken);
    console.log(resp);
    if (resp === "Success") {
      //이미 등록된 경우
      loggedIn = true;
      autoLogin = false;
      needRegister = false;
      console.log("Registered");
    } else if (resp === "Failed") {
      //등록되지 않은 경우
      loggedIn = false;
      autoLogin = false;
      needRegister = true;
      console.log("Unregistered");
    } else {
      //시작하기 실패
      loggedIn = false;
      autoLogin = false;
      needRegister = false;
      console.log("시작하기 실패: [", resp, "]")
    }
  } else {
    //시작하기 실패
    loggedIn = false;
    autoLogin = false;
    needRegister = false;
    console.log("google login failed");
  }
  dispatch(_Login(loggedIn, autoLogin, needRegister, user, idToken));
};

export const AutoLoginThunk = () => async (dispatch: Function) => {
  //자동 로그인 부분 구현
  //기존의 Auth정보를 이용하여 구글 로그인을 암묵적으로 수행합니다

  console.log("autologin");

  if (__DEV__) {
    //바로 자동 로그인 실패
    console.log("development mode")
    const loggedIn: boolean = false;
    const autoLogin: boolean = false;
    const needRegister: boolean = false;
    dispatch(_Login(loggedIn, autoLogin, needRegister, null, null));
  } else {
    //앱 출시
    let { user, idToken } = await EnvGetGoogleService().autoSignInAsync();
    if (user === undefined) user = null;

    let loggedIn: boolean;
    let autoLogin: boolean;
    let needRegister: boolean;

    console.log(user, idToken);

    if (user !== null) {
      console.log("production mode");
      //시작하기 성공
      const resp = await ServerService.CheckUserRegistered(idToken);
      if (resp === "Success") {
        //이미 등록된 경우
        loggedIn = true;
        autoLogin = false;
        needRegister = false;
        console.log("Registered");
      } else if (resp === "Failed") {
        //등록되지 않은 경우
        loggedIn = false;
        autoLogin = false;
        needRegister = true;
        console.log("Unregistered");
      } else {
        //시작하기 실패
        loggedIn = false;
        autoLogin = false;
        needRegister = false;
        console.log("google login failed");
      }
    } else {
      //시작하기 실패
      loggedIn = false;
      autoLogin = false;
      needRegister = false;
      console.log("google login failed");
    }
    dispatch(_Login(loggedIn, autoLogin, needRegister, user, idToken));
  }
};

export const CancelMembershipThunk = () => async (dispatch: Function, getState: Function) => {
  await ServerService.CancelMembership();
  await EnvGetGoogleService().signOutAsync();
  dispatch(_Logout());
}


/// apple
export const AppleRegisterThunk = (email: string, password: string, name: string) => async (
  dispatch: Function,
  getState: Function
) => {
  
  let registerRes = await ServerService.AppleRegisterAccount(email, password, name);

  console.log('registerRes', registerRes);

  if(registerRes === "NoInternet") return "NoInternet";
  if(registerRes === "Fetch Failed") return "Fetch Failed";
  const regresp = registerRes as {log: string, msg: string};

  if(regresp.msg === "email already exist")
    Alert.alert("알콩달콩", "이미 가입된 이메일입니다.");

  if(regresp.log !== "success") return "failed";

  const res = await ServerService.AppleEmailValidation(email);
  if(res === "success")
    Alert.alert("알콩달콩", "인증 메일을 전송했습니다. 인증을 먼저 완료해주세요. 메일을 찾지 못하셨을 경우 스팸 메일함을 확인해주세요.");
  else
  {
    if(res === "failed")
      Alert.alert("알콩달콩", "인증 메일 발송에 실패했습니다. 로그인 화면에서 다시 인증 메일을 보낼 수 있습니다.");
  }

};

export const AppleAutoLoginThunk = () => async (dispatch: Function) => {
  //앱에 저장된 정보를 이용해서 로그인을 수행

  const email = await SecureStore.getItemAsync("email");
  const password = await SecureStore.getItemAsync("password");

  console.log("securestore", email, password);

  if(email === null || password === null)
  {
    const loggedIn = false;
    const autoLogin = false;
    const needRegister = false;
    let user: GoogleUser = {
      id: "",
      name: "",
      givenName: "",
      familyName: "",
      photoUrl: "",
      email: "",
    }
    console.log("apple login failed"); 
    dispatch(_Login(loggedIn, autoLogin, needRegister, user, ""));
    return;
  }

  //fetch
  let rest_name: string = ""

  type Result = { log: string, id: string, name: string };
  let rest: Result = { log: "failed", id: "", name: "" };
  const ret = await ServerService.AppleCheckUserRegistered(email, password);
  if (ret === "NoInternet") return;
  if (ret === "Fetch Failed") return;
  else {
    rest = (ret as Result);
  }

  rest_name = rest.name ?? "";

  let loggedIn: boolean = false;
  let autoLogin: boolean = false;
  let needRegister: boolean = false;

  let user: GoogleUser = {
    id: email,
    name: rest_name,
    givenName: rest_name,
    familyName: rest_name,
    photoUrl: "",
    email: email,
  }
  let idToken: string = email;

  if (rest.log === "success") {
    loggedIn = true;
    autoLogin = false;
    needRegister = false;
    console.log("apple login success");
  }
  else {
    loggedIn = false;
    autoLogin = false;
    needRegister = false;
    console.log("apple login failed");
  }

  dispatch(_Login(loggedIn, autoLogin, needRegister, user, idToken));
}

export const AppleLoginThunk = (email: string, password: string) => async (dispatch: Function) => {

  //fetch
  let rest_name: string = ""

  type Result = { log: string, id: string, name: string, msg: string};
  let rest: Result = { log: "failed", id: "", name: "", msg: "" };
  const ret = await ServerService.AppleCheckUserRegistered(email, password);
  if (ret === "NoInternet") return;
  if (ret === "Fetch Failed") return;
  else {
    rest = (ret as Result);
  }

  if(rest.msg === "not certification")
  {
    Alert.alert("알콩달콩", "이메일 인증을 완료해주세요.");
    return;
  }

  if(rest.log === "failed")
  {
    Alert.alert("알콩달콩", "아이디 또는 비밀번호가 틀렸습니다.");
    return;
  }

  rest_name = rest.name ?? "";

  let loggedIn: boolean = false;
  let autoLogin: boolean = false;
  let needRegister: boolean = false;

  let user: GoogleUser = {
    id: email,
    name: rest_name,
    givenName: rest_name,
    familyName: rest_name,
    photoUrl: "",
    email: email,
  }
  let idToken: string = email;

  if (rest.log === "success") {
    loggedIn = true;
    autoLogin = false;
    needRegister = false;
    console.log("apple login success");

    await SecureStore.setItemAsync("email", email);
    await SecureStore.setItemAsync("password", password);
  }
  else {
    loggedIn = false;
    autoLogin = false;
    needRegister = false;
    console.log("apple login failed");
  }

  dispatch(_Login(loggedIn, autoLogin, needRegister, user, idToken));
}

export const AppleCancelMembershipThunk = () => async (dispatch: Function, getState: Function) => {
  await ServerService.CancelMembership();

  await SecureStore.setItemAsync("email", "");
  await SecureStore.setItemAsync("password", "");
  dispatch(_Logout());
}

export const AppleLogoutThunk = () => async (dispatch: Function, getState: Function) => {
  dispatch(_Logout());
}

export const AppleEmailValidationThunk = (email: string) => async (dispatch: Function, getState: Function) => {
  const res = await ServerService.AppleEmailValidation(email);
  if(res === "success")
    Alert.alert("알콩달콩", "인증 메일을 전송했습니다. 인증을 먼저 완료해주세요. 메일을 찾지 못하셨을 경우 스팸 메일함을 확인해주세요.");
  else
  {
    if(res === "failed")
      Alert.alert("알콩달콩", "인증 메일 발송에 실패했습니다. 로그인 화면에서 다시 인증 메일을 보낼 수 있습니다.");
  }

}