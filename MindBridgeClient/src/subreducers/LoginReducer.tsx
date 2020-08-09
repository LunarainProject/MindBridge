import ActionTypes from "../actions/ActionTypes";
import { LoginAction, LoginActions } from "../actions/LoginActions";
import { LoginState } from "../StateTypes";

export default (state: LoginState = {
  autoLogin: true,
  loggedIn: false,
  needRegister: false,
  user: null,
  idToken: null,
}, action: LoginActions): LoginState => {
  switch (action.type) {
    case ActionTypes.LOGIN:
    {
      return {...state, ...(action as LoginAction)};
    }
    case ActionTypes.LOGOUT:
      return { autoLogin: false, loggedIn: false, needRegister: false, user: null, idToken: null };
    case ActionTypes.REGISTER:
      return { ...state, autoLogin: false, loggedIn: true, needRegister: false};
    default:
      return state;
  }
};