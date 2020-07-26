import IAction from "./IAction";
import ActionTypes from "./ActionTypes";

export class CardActions implements IAction {
    type: string = "";
}

export function SetFakeData(): CardActions{
    return {
        type: ActionTypes.SET_FAKE_DATA,
    };
}