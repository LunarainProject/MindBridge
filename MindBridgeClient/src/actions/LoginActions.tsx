import IAction from "./IAction";
import ActionTypes from "./ActionTypes";
import * as SecureStore from "expo-secure-store";
import { Infra, NetworkService } from "../services/NetworkService";

export type LoginActions = LoginAction | LogoutAction;


export class LogoutAction implements IAction {
  type: string = "";
}
export function Logout(): LogoutAction {
  return {
    type: ActionTypes.LOGOUT,
  };
}

export class LoginAction implements IAction {
  type: string = "";
  loggedIn: boolean = false;
  loginFailed: boolean = false;
}
function _Login(loggedIn: boolean, loginFailed: boolean): LoginAction {
  return {
    type: ActionTypes.LOGIN,
    loggedIn,
    loginFailed,
  };
}

export const LoginThunk = (name: string, phone: string) => async (
  dispatch: Function
) => {
  await SecureStore.setItemAsync("name", name);
  await SecureStore.setItemAsync("phone", phone);

  const loggedIn: boolean = false;
  const loginFailed: boolean = false;

  dispatch(_Login(loggedIn, loginFailed));
};

export const AutoLoginThunk = () => async (dispatch: Function) => {
  console.log("AutoLogin Thunk");
  const name = await SecureStore.getItemAsync("name");
  const phone = await SecureStore.getItemAsync("phone");

  console.log("get completed", name, phone);
  let loggedIn: boolean = false;
  let loginFailed: boolean = true;
  if (name !== null && phone !== null) {
    loggedIn = await NetworkService.Login(name, phone);
    loginFailed = !loggedIn;
  }

  dispatch(_Login(loggedIn, loginFailed));
};
