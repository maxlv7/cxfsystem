import {combineReducers} from "redux-immutable";
import {reducer as LoginReducer} from '../pages/login/store'
import {reducer as HomeReducer} from '../pages/home/store'

const reducer = combineReducers({
    Login:LoginReducer,
    Home:HomeReducer
});

export default reducer;