import {combineReducers} from "redux-immutable";
import {reducer as LoginReducer} from '../pages/login/store'

const reducer = combineReducers({
    Login:LoginReducer
});

export default reducer;