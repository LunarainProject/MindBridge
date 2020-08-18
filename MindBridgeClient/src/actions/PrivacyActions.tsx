import IAction from "./IAction";
import ActionTypes from "./ActionTypes";
import { LoginState, PrivacyState, UserInfo } from "../StateTypes";
import ServerService from "../services/ServerService";

export type PrivacyActions = SetUserInfoAction | SetSpouseInfoAction;

export class SetUserInfoAction implements IAction {
  type: string = "";
  userInfo: UserInfo = {
    name: "",
    birthDay: new Date(),
    sex: "female",
    image: "",
  };
}
function _SetUserInfo(userInfo: UserInfo): SetUserInfoAction {
  return {
    type: ActionTypes.SET_USER_INFO,
    userInfo,
  }
}

export class SetSpouseInfoAction implements IAction {
    type: string = "";
    spouseInfo: UserInfo = {
      name: "",
      birthDay: new Date(),
      sex: "female",
      image: "",
    };
  }
function _SetSpouseInfo(spouseInfo: UserInfo): SetSpouseInfoAction {
    return {
        type: ActionTypes.SET_SPOUSE_INFO,
        spouseInfo,
      }
}

export const RetrieveUserInfoThunk = () => async (dispatch: Function, getState: Function) => {
    const { idToken, user } = (getState().Login as LoginState);
    const userInfo = await ServerService.GetUserInfo(idToken, user);
    dispatch(_SetUserInfo(userInfo));
}

export const RetrieveSpouseInfoThunk = () => async (dispatch: Function, getState: Function) => {
    const { idToken } = (getState().Login as LoginState);
    const spouseInfo = await ServerService.GetSpouseInfo(idToken);
    if(spouseInfo) {
        dispatch(_SetSpouseInfo(spouseInfo));
    }
}

export const MatchSpouseThunk = (spouseEmail: string) => async (dispatch: Function, getState: Function) => {
  const { idToken } = (getState().Login as LoginState);
  await ServerService.MatchSpouse(idToken, spouseEmail);
}