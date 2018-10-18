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
     // axios.get('/api/login.json?user='+user+'&password='+password)
     axios.get('https://www.easy-mock.com/mock/5ba36de3a1924362236a3e68/test')
            .then((res)=>{
                const data = res.data;
                console.log(data);
                if(data.msg === 'success')
                {
                    dispatch(changeLogin(true));
                    dispatch(unloading());
                    setAuth(data.data.token,data.data.uid);
                    Toast.success("登录成功!")
                }
                else{
                    Toast.fail('用户名或密码出错!')
                }
            })
            .catch(()=>{
                dispatch(unloading());
                Toast.offline('oh!oh!网络出错了!')
            })

  }
};