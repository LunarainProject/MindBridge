import ActionTypes from "../actions/ActionTypes";
import { SetResultAction, SetSpouseResultAction, SurveyActions } from "../actions/SurveyActions";
import { SurveyState } from "../StateTypes";

export default (state: SurveyState = {
  SurveyResultCards: [],
  SpouseResultCards: [],
}, action: SurveyActions): SurveyState => {
  switch (action.type) {
    case ActionTypes.SET_RESULT:
    {
      state = { ...state, SurveyResultCards: (action as SetResultAction).resultCards}
      return state;
    }
    case ActionTypes.SET_SPOUSE_RESULT:
    {
      state = { ...state, SpouseResultCards: (action as SetSpouseResultAction).resultCards}
      return state;
    }
    default:
      return state;
  }
};