import * as CountActions from './actions/CountActions';
import * as CardActions from './actions/CardActions';
import * as LoginActions from './actions/LoginActions';

const CombineAction = Object.assign({},
    CountActions,
    CardActions,
    LoginActions,
);

export default CombineAction;