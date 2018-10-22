import * as constants from './constants'
import {fromJS} from "immutable";

import axios from 'axios'
import {baseURl,setHeaders} from "../../../utils/config";


const getStuList = (data)=>({
    type: constants.GET_STU_LIST,
    data:data
});


const getUser = (uid,username,point)=>({
    type:constants.GET_USER_INFO,
    data: [uid,username,point]
});
export const getUserInfo = (id)=>{
  return (dispatch)=>{
        axios.get(baseURl+'/admin/getUserInfo?id='+id)
            .then((res)=>{
                const user = res.data.data;
                dispatch(getUser(user.id,user.username,user.point))
            })
            .catch()
  }
};

export const getListData = ()=>{
    return (dispatch)=>{
        axios.get(baseURl+'/admin/getStuList',setHeaders())
            .then((res)=>{
                const data = res.data.data.stuList;
                //这里的data要为immutable对象
                dispatch(getStuList(fromJS(data)))
            })
            .catch();

    }
};