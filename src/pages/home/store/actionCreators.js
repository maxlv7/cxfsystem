import * as constants from './constants'
import {fromJS} from "immutable";
import {Toast} from "antd-mobile";

import axios from 'axios'
import {baseURl,setHeaders} from "../../../utils/config";


const getStuList = (data)=>({
    type: constants.GET_STU_LIST,
    data:data
});

const getUser = (uid,username,point,stuNum)=>({
    type:constants.GET_USER_INFO,
    data: [uid,username,point,stuNum]
});

const getAction = (data)=>({
  type:constants.GET_USER_ACTION,
  data:data
});

const defaultPoint = (data)=>({
    type:constants.GET_DEFAULT_POINT,
    data:data
});

//得到用户信息
export const getUserInfo = (id)=>{
  return (dispatch)=>{
        axios.get(baseURl+'/admin/getUserInfo?id='+id,setHeaders())
            .then((res)=>{
                const user = res.data.data;
                dispatch(getUser(user.id,user.username,user.point,user.stuNum))
            })
            .catch(()=>{
                Toast.offline("哦哦!网络出错了!")
            })
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
            .catch(()=>{
                Toast.offline("哦哦!网络出错了!")
            })
    }
};


//得到首页数据
export const getListData = ()=>{
    return (dispatch)=>{
        axios.get(baseURl+'/admin/getStuList',setHeaders())
            .then((res)=>{
                if(res.data.status===200){
                    const data = res.data.data.stuList;
                    //这里的data要为immutable对象
                    dispatch(getStuList(fromJS(data)))
                }else {
                    Toast.info(res.data.msg);
                }

            })
            .catch(()=>{
                Toast.offline("哦哦!网络出错了!")
            });

    }
};

//得到默认的分数
export const getDefaultPoint = (dispatch)=>{
    return (dispatch)=>{
        axios.get(baseURl+'/admin/getConfig?key=defaultPoint',setHeaders())
            .then((res)=>{
                const point = res.data.data;
                dispatch(defaultPoint(point))
            })
            .catch(()=>{
                Toast.fail("哦哦!获取默认分数出错了!")
            });
    }
};