import { combineReducers } from 'redux';
import CardReducer from './subreducers/CardReducer';
import CountReducer from './subreducers/CountReducer';
import LoginReducer from './subreducers/LoginReducer';
import SurveyReducer from './subreducers/SurveyReducer';

export default combineReducers({
    Count: CountReducer,
    Card: CardReducer,
    Login: LoginReducer,
    Survey: SurveyReducer,
});