import React,{useState,useEffect} from 'react';

import { useDispatch, useSelector } from 'react-redux';



import {
BrowserRouter as Router,
Routes,
Route,
Link,
useParams

} from "react-router-dom";

import { isUserLoggedIn, getInitialData } from './actions';



import SignIn from './SignIn';
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import PrivateOutlet from "./PrivateOutlet";


import './App.css';

function App() {
	
const dispatch = useDispatch();
  //const auth = useSelector(state => state.auth)
const auth = useSelector((state) => state.auth);
	console.log(auth);
	
	//componentDidMount or componentDidUpdate
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);
	
  return (
  <Router>
    <div className="App">

	<Routes>
	  <Route path="/signin"  element={<SignIn/>}>Sign In
	  </Route>

	  
	   <>
	   {/*<Route path="/dashboard"  element={<Dashboard/>}>
	   Dashboard
	  </Route>
	  
	   <Route path="/homepage"  element={<HomePage/>}>HomePage
	   </Route>*/}
	   
	   <Route path="/*" element={<PrivateOutlet/>}>
		<Route path="dashboard" element={<Dashboard/>} />
		</Route>
	  
	  
	  </>
	  
	  
		</Routes>
    </div>
	  </Router>
  );

}

export default App;
