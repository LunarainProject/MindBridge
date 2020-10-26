import * as CountActions from './actions/CountActions';
import * as CardActions from './actions/CardActions';
import * as LoginActions from './actions/LoginActions';
import * as SurveyActions from './actions/SurveyActions';
import * as PrivacyActions from './actions/PrivacyActions';
import * as SystemActions from './actions/SystemActions';

const CombineAction = Object.assign({},
    CountActions,
    CardActions,
    LoginActions,
    SurveyActions,
    PrivacyActions,
    SystemActions,
);

export default CombineAction;