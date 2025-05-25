import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
});
axios.defaults.withCredentials = true;
export default instance;
