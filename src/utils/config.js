export const baseURl = 'http://118.126.108.40:5000/api';
// export const baseURl = 'http://192.168.31.187:5000/api';


export const setHeaders = ()=>{
  return {
    headers: { Authorization: localStorage.getItem('access_token') }
  }
};