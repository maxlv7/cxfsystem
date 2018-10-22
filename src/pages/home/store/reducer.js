import {fromJS} from "immutable";
import * as constants from './constants'

const defaultState = fromJS({
    stuList:[],
    now_uid:null,
    now_user:null,
    now_score:null,
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
            now_score:action.data[2]
        })
    }
    return state
}
