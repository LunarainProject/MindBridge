import ActionTypes from "../actions/ActionTypes";
import { PrivacyActions, SetSpouseInfoAction, SetUserInfoAction } from "../actions/PrivacyActions";
import { AddResultAction } from "../actions/SurveyActions";
import { PrivacyState, } from "../StateTypes";

export default (state: PrivacyState = {
  UserInfo: {
    name: "",
    birthDay: new Date(),
    image: "",
    sex: "female",
  },
  SpouseInfo: {
    name: "",
    birthDay: new Date(),
    image: "",
    sex: "male",
  }
}, action: PrivacyActions): PrivacyState => {
  switch (action.type) {
    case ActionTypes.SET_USER_INFO:
      state= {...state, UserInfo: (action as SetUserInfoAction).userInfo}
      return state;
    case ActionTypes.SET_SPOUSE_INFO:
      state= {...state, SpouseInfo: (action as SetSpouseInfoAction).spouseInfo}
      return state;
    default:
      return state;
  }
};