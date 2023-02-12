import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
}) // на каждый запрос вшивается Authorization и любой запрос понимает есть ли у него токен или нету

export default instance;