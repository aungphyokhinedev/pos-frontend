// axios.js
import axios from 'axios';
import  {store} from '../store'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // eslint-disable-next-line no-console
     

    var loginType = store.getters['poslogin/type'];
    //config.headers.Authorization = 'this is test header'
    //var token = store.getters['common/authToken'] || store.getters['poslogin/token'];
    var token =  store.getters['poslogin/token'];
    if(loginType == "owner" || loginType == "user"){
      config.headers.Authorization = '' + token;
    }

    

    var saleUserToken = store.getters['possalelogin/token'];
    
    if(loginType == "sale" ){ 
    
       config.headers.Authorization = '' + saleUserToken;
    }
    

    // eslint-disable-next-line no-console
    console.log(config);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {

  // eslint-disable-next-line no-console
  console.log(response);
    if(response.data.code && response.data.code != 200){
      return Promise.reject(response.data.type + ' [' + response.data.code + ']');
    }
    return response;
  }, function (error) {
    if (401 === error.response.status) {
      // eslint-disable-next-line no-console
      console.log('logout')
      store.dispatch("common/logout");
    }
     // eslint-disable-next-line no-console
     console.log()
    let err = error.response.data;
    // Do something with response error
    return Promise.reject(err.message + ' [' + err.code + ']');
  });

export default axios;