import IAction from "./IAction";
import ActionTypes from "./ActionTypes";
import { GoogleUser } from "expo-google-app-auth";
import ServerService from "../services/ServerService";
import { LoginState } from "../StateTypes";
import EnvGetGoogleService from "../services/EnvGetGoogleService";

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
      } else if(resp === "Failed") {
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