import { combineReducers } from 'redux';
import CardReducer from './subreducers/CardReducer';
import CountReducer from './subreducers/CountReducer';
import LoginReducer from './subreducers/LoginReducer';
import PrivacyReducer from './subreducers/PrivacyReducer';
import SurveyReducer from './subreducers/SurveyReducer';
import SystemReducer from './subreducers/SystemReducer';

export default combineReducers({
    Count: CountReducer,
    Card: CardReducer,
    Login: LoginReducer,
    Survey: SurveyReducer,
    Privacy: PrivacyReducer,
    System: SystemReducer,
});