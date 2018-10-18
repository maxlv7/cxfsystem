import {fromJS} from "immutable";
import * as constants from './constants'

const defaultState = fromJS({
    stuList:[]
});

export default (state=defaultState,action)=>{

    if(action.type === constants.GET_STU_LIST){
        return state.set('stuList',action.data)
    }
    return state
}
