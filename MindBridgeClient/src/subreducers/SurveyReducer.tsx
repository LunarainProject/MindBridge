import ActionTypes from "../actions/ActionTypes";
import { AddResultAction, SurveyActions } from "../actions/SurveyActions";
import { LoginState, SurveyState } from "../StateTypes";

export default (state: SurveyState = {
  SurveyResultCards: []
}, action: SurveyActions): SurveyState => {
  switch (action.type) {
    case ActionTypes.ADD_RESULT:
    {
      state = { SurveyResultCards: [...state.SurveyResultCards, ...(action as AddResultAction).resultCards]}
      return state;
    }
    default:
      return state;
  }
};