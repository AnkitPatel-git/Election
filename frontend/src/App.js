import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { useStateContext } from './contexts/ContextProvider';
import DashBoard from './pages/DashBoard';
import Results from './pages/Results';


import UserSignup from './pages/userloginsignupform/UserSignUp';
import UserLogin from './pages/userloginsignupform/UserLogin';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateComponent from './components/PrivateComponent';
import VoteForm from './pages/VoteForm';



const App = () => {
  const { setCurrentColor, setCurrentMode, 
   } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  const token= localStorage.getItem('token') || true

  return (

      <BrowserRouter>
          <ToastContainer autoClose={500}/>
           <Routes>

              <Route path="/" element={(<UserLogin/>)} />
              
              <Route path="/Logout" element={(<UserLogin/>)} />
              <Route path="/register" element={(<UserSignup/>)} />
            
             {/* pages */}
              <Route element={<PrivateComponent/>}>
                <Route path="/Dashboard" element={ token?(<DashBoard />):<Navigate to="/"/>} />
                <Route path="/Results" element={ token?(<Results />):<Navigate to="/"/>} />
                <Route path="/Vote" element={ token?(<VoteForm />):<Navigate to="/"/>} />
                {/* user navigation */}
                
                </Route>
              

                {/* apps  */}
                


              </Routes>
       
      </BrowserRouter>
 
  );
};

export default App;
