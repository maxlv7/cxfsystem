import * as constants from './constants'
import {Toast} from 'antd-mobile'
import axios from 'axios'
import {baseURl} from "../../../utils/config";


export const loading = ()=>({
  type: constants.LOGIN_LOADING,
});

export const unloading = ()=>({
  type: constants.LOGIN_UNLOADING,
});

export const forceLogin = ()=>({
   type: constants.FORCE_LOGIN
});

export const changeLogin = (value)=>({
   type: constants.LOGIN_CHANGE_LOGIN,
   data:value
});

const setAuth = (token,uid,username,group)=>{
    localStorage.setItem('access_token',token);
    localStorage.setItem('uid',uid);
    localStorage.setItem('username',username);
    localStorage.setItem('group',group);
};

export const login = (user,password)=>{
  return (dispatch)=>{
      const postJson = {
          'username':user,
          'password':password
      };
     axios.post(baseURl+'/auth/login',(postJson))
            .then((res)=>{
                const data = res.data;
                console.log(data);
                if(data.status === 200)
                {
                    const {token,uid,username,group} =data.data;
                    setAuth(token,uid,username,group);
                    dispatch(changeLogin(true));
                    dispatch(unloading());
                    Toast.success(data.msg)
                }
                else{
                    Toast.fail(data.msg);
                    dispatch(unloading());
                }
            })
            .catch(()=>{
                dispatch(unloading());
                Toast.offline('oh!oh!网络出错了!')
            })

  }
};