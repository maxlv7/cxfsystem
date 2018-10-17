import {fromJS} from "immutable";
import * as constants from './constants'

const defaultState = fromJS({
    login:false,
    loading:false
});

export default (state=defaultState,action)=>{
    if(action.type ===constants.LOGIN_LOADING){
        return state.set('loading',true)
    }
    if(action.type ===constants.LOGIN_UNLOADING){
        return state.set('loading',false)
    }
    if(action.type === constants.LOGIN_CHANGE_LOGIN){
        return state.merge({
            login:action.data
        })
    }
    return state
}
