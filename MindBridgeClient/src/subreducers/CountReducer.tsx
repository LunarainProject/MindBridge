import ActionTypes from '../actions/ActionTypes';
import { CountAction } from '../actions/CountAction';

const count: number = 0;
export default (state: number = count, action: CountAction) => {
    switch (action.type) {
        case ActionTypes.COUNT_UP:
            return state + action.payload;
        case ActionTypes.COUNT_DOWN:
            return state - action.payload;
        default:
            return state;
    }
}