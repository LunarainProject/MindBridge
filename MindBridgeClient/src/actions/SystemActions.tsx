import IAction from "./IAction";
import ActionTypes from "./ActionTypes";

export type SystemActions = SetAppStateAction;

export class SetAppStateAction implements IAction {
    type: string = "";
    appState: "active"|"inactive" = "active";
}
export const SetAppState = (state: "active"|"inactive"): SetAppStateAction => {
    return {
        type: ActionTypes.SET_APP_STATE,
        appState: state,
    };
}