'use strict';

import APIUtils from './APIUtils';

const AuthAPI = {

  checkLoginStatus() {
    return APIUtils.get('auth/check');
  },

  login(user) {
    //return APIUtils.post('auth/login', user);
    console.log('user=',user);
    return new Promise((resolve, reject) => {
	    setTimeout(function(){
	    	var res = { success: user.username === 'test' && user.password === 'test' };
	        if(!res.success) {
	            res.message = 'Username or password is incorrect';
	            reject(res.message);
	        }
	        res.message = 'Login Successfully'
	        resolve(res.message)
	    }, 1000);
	});
  },

  logout() {
    return APIUtils.post('auth/logout');
  }

};

export default AuthAPI;