import * as constants from './constants'
import {Toast} from 'antd-mobile'
import axios from 'axios'



export const loading = ()=>({
  type: constants.LOGIN_LOADING,
});

export const unloading = ()=>({
  type: constants.LOGIN_UNLOADING,
});

export const forceLogin = ()=>({
   type: constants.FORCE_LOGIN
});

const changeLogin = (value)=>({
   type: constants.LOGIN_CHANGE_LOGIN,
   data:value
});

const setAuth = (token,uid)=>{
    localStorage.setItem('access_token',token);
    localStorage.setItem('uid',uid);
};

export const login = (user,password)=>{
  return (dispatch)=>{
      const postJson = {
          'username':user,
          'password':password
      };
     axios.post('http://localhost:5000/api/auth/login',(postJson))
            .then((res)=>{
                const data = res.data;
                console.log(data);
                if(data.status === 200)
                {
                    dispatch(changeLogin(true));
                    dispatch(unloading());
                    setAuth(data.data.token,data.data.uid);
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