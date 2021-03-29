import { axiosPost, axiosGet, axiosPatch, axiosDelete, Response, axiosPut } from './http';
import query from 'querystring';
import axios from 'axios';
const authorizationBearer = localStorage.getItem('token');
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: `Bearer ${authorizationBearer}`,
  },
};
const encodePost = (url, data) => {
  return axios.post(`https://api-chedarek.wereact.co/${url}`, query.stringify(data), config);
};
const encodePatch = (url, data) => {
  return axios.patch(`https://api-chedarek.wereact.co/${url}`, query.stringify(data), config);
};

export const LoginRequest = data => encodePost('auth/signin', data);
export const SignupRequest = data => encodePost('auth/signup', data);
export const GetGovernorates = () => axiosGet('governorate');
export const GetExitreasons = () => axiosGet('exitreason');
export const GetCurfew = () => axiosGet('curfew');
export const GenerateQrcode = data => axiosPost('permission/unregistreduser', { data });
export const GenerateQrcodeLogged = data => axiosPost('permission/registreduser', { data });
