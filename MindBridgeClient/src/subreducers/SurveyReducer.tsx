import ActionTypes from "../actions/ActionTypes";
import { SetResultAction, SurveyActions } from "../actions/SurveyActions";
import { SurveyState } from "../StateTypes";

export default (state: SurveyState = {
  SurveyResultCards: []
}, action: SurveyActions): SurveyState => {
  switch (action.type) {
    case ActionTypes.SET_RESULT:
    {
      state = { SurveyResultCards: (action as SetResultAction).resultCards}
      return state;
    }
    default:
      return state;
  }
};