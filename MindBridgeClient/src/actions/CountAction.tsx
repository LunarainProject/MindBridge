import IAction from "./IAction";
import ActionTypes from "./ActionTypes";

export class CountAction implements IAction {
    type: string = "";
    payload: number = 0;
}

export function CountUp(num: number): CountAction {
    return {
        type: ActionTypes.COUNT_UP,
        payload: num
    };
}

export function CountDown(num: number): CountAction {
    return {
        type: ActionTypes.COUNT_DOWN,
        payload: num
    };
}