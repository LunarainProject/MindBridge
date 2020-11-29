import ActionTypes from "../actions/ActionTypes";
import { SystemState } from "../StateTypes";
import { SetAppStateAction, SystemActions } from "../actions/SystemActions"

export default (state: SystemState = {
  appState: "active",
}, action: SystemActions): SystemState => {
  switch (action.type) {
    case ActionTypes.SET_APP_STATE:
    {
      //console.log('Go '+(action as SetAppStateAction).appState)
      state = { ...state, appState: (action as SetAppStateAction).appState}
      return state;
    }
    default:
      return state;
  }
};