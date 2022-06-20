import axios from "axios";

import { authConstants } from "../constants";

export const login = (user) => async (dispatch) => {
	//console.log('user auth.actions=',user);
	  const res = await axios.post(`/signin`, {
            ...user
        });
		
		//console.log('res=',res)
		
		if(res.status === 200){
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
         
		   dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
		
		
		/*if(res.status === 200){
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
	*/
	
    /*try {
    const res = await axios.post(`/admin/signin`, {
            ...user
        });


  } catch (error) {
	  //console.log('not ok');
  
  }*/
}



export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
       const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }else{
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            });
        }
    }
}


export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axios.get(`/initialdata`);
	//console.log('initialDatavalue',res.data);
					//res.data;
					
	if(res.status === 200){
	 const { values } = res.data;
	 
	 dispatch({
                type: authConstants.INITIAL_SUCCESS,
                payload: {
                    values
                }
            });
	}
  };
};


export const signout = () => {
    return async dispatch => {

        dispatch({ type: authConstants.LOGOUT_REQUEST });
        const res = await axios.get(`/signout`);

        if(res.status === 200){
            localStorage.clear();
            dispatch({ type: authConstants.LOGOUT_SUCCESS });
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: { error: res.data.error }
            });
        }

        
    }
}