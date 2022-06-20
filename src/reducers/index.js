
import { combineReducers } from 'redux';
import  authReducer from './authReducers';
import  initialReducer from './initialReducers';



const reducer = combineReducers({
	auth:authReducer,
	initial:initialReducer
	
});

 
 
 export default reducer;