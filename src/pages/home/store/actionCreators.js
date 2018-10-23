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

const getAction = (data)=>({
  type:constants.GET_USER_ACTION,
  data:data
});

//得到用户信息
export const getUserInfo = (id)=>{
  return (dispatch)=>{
        axios.get(baseURl+'/admin/getUserInfo?id='+id,setHeaders())
            .then((res)=>{
                const user = res.data.data;
                dispatch(getUser(user.id,user.username,user.point))
            })
            .catch()
  }
};

//得到用户对应的活动信息
export const getUserAction = (id)=>{
    return (dispatch)=>{
        axios.get(baseURl+'/admin/getUserAction?id='+id,setHeaders())
            .then((res)=>{
                const action =res.data.data;
                dispatch(getAction(fromJS(action)))
            })
            .catch()
    }
};


//得到首页数据
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