import ActionTypes from "../actions/ActionTypes";
import { LoginAction, LoginActions } from "../actions/LoginActions";
import { LoginState } from "../StateTypes";

export default (state: LoginState = {
  LoggedOut: false,
  LoggedIn: false,
  LoginFailed: false,
}, action: LoginActions): LoginState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
    {
      const { loggedIn: LoggedIn, loginFailed: LoginFailed } = (action as LoginAction);
      return {...state, LoggedIn, LoginFailed };
    }
    case ActionTypes.LOGOUT:
      return { LoggedOut: true, LoggedIn: false, LoginFailed: false };
    default:
      return state;
  }
};