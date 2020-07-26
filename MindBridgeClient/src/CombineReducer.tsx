import { combineReducers } from 'redux';
import CardReducer from './subreducers/CardReducer';
import CountReducer from './subreducers/CountReducer';

export default combineReducers({
    Count: CountReducer,
    Card: CardReducer,
});