import * as CountActions from './actions/CountActions';
import * as CardActions from './actions/CardActions';
import * as LoginActions from './actions/LoginActions';
import * as SurveyActions from './actions/SurveyActions';

const CombineAction = Object.assign({},
    CountActions,
    CardActions,
    LoginActions,
    SurveyActions,
);

export default CombineAction;