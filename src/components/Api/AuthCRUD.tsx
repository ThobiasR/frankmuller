import axios from 'axios';
import store from '../../store';

const API_URL = 'http://fmcryptoapi.crebos.online/api' || 'api';

axios.interceptors.request.use(
  (config: any) => {
    const token: any = store.getState().auth;
    if (token.token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }
    return config;
  },
  (error: any) => {
    Promise.reject(error);
  }
);

export function login(email: string, password: string) {
  return axios.post('http://fmcryptoapi.crebos.online/api/auth/login', {
    email,
    password,
  });
}

export function postItems(items: any) {
  return axios.post('https://fmcryptoapi.crebos.online/api/user/items', {
    items,
  });
}

export function postItem(id: any) {
  return axios.post(`https://fmcryptoapi.crebos.online/api/user/claim/${id}`);
}

export function register(
  firstname: string,
  surname: string,
  email: string,
  password: string,
  phone: string,
  country: string,
  street: string,
  nr: any,
  zip_code: string,
  city: string
) {
  return axios.post(`${API_URL}/auth/register`, {
    firstname,
    surname,
    email,
    password,
    phone,
    country,
    street,
    nr,
    zip_code,
    city,
  });
}
