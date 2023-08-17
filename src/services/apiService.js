// apiService.js
import axios from 'axios';
import tokenData from '../utils/token';

const taskApi = axios.create({
  baseURL: tokenData.taskUrl, // Set your API base URL
  timeout: 10000, // Set timeout (optional)
});

taskApi.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';
  config.headers['Authorization'] = `Bearer ${tokenData.taskKey}`;
  return config;
});


export default taskApi;
