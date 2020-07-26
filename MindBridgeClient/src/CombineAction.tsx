import * as CountActions from './actions/CountActions';
import * as CardActions from './actions/CardActions';

const CombineAction = Object.assign({},
    CountActions,
    CardActions,
);

export default CombineAction;