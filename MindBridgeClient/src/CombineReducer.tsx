import { combineReducers } from 'redux';
import CountReducer from './subreducers/CountReducer';

export default combineReducers({
    count: CountReducer
});