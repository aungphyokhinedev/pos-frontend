// axios.js
import axios from 'axios';
import  {store} from '../store'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    var userToken = store.getters['possalelogin/token'];
    if(userToken){
     
      config.headers.Authorization = '' + userToken;
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default axios;