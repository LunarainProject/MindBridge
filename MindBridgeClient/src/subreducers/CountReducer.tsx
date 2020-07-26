import ActionTypes from '../actions/ActionTypes';
import { CountActions } from '../actions/CountActions';
import * as StateTypes from '../StateTypes';

const count: number = 0;
export default (state: StateTypes.CountState = { Count: count}, action: CountActions) => {
    switch (action.type) {
        case ActionTypes.COUNT_UP:
            return { Count: state.Count + action.payload};
        case ActionTypes.COUNT_DOWN:
            return { Count: state.Count - action.payload};
        default:
            return state;
    }
}