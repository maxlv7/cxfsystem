import {fromJS} from "immutable";
import * as constants from './constants'

const defaultState = fromJS({
    stuList:[],
    now_uid:null,
    now_user:null,
    now_score:null,
    now_stuNum:null,
    action_list:[]
});

export default (state=defaultState,action)=>{

    if(action.type === constants.GET_STU_LIST){
        return state.set('stuList',action.data)
    }
    if(action.type === constants.GET_USER_INFO){
        return state.merge({
            now_uid:action.data[0],
            now_user:action.data[1],
            now_score:action.data[2],
            now_stuNum:action.data[3]
        })
    }
    if(action.type === constants.GET_USER_ACTION){
        return state.set('action_list',action.data)
    }
    return state
}
