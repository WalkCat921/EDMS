import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Router
} from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registration from './pages/Registration';
import PageNotFound from './pages/PageNotFound';
import PrivateRoute from './utils/PrivateRoute';
import AuthTokenResponse from './utils/AuthTokenResponse'

function App() {
  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname]); // triggered on route change

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo?.token) {
      AuthTokenResponse(userInfo.token)
    }
  })

  
  return (
    <>
      <Routes>
        <Route excat path="/" element={<Login />} />
        <Route excat path="/registration" element={<Registration />} />
        <Route exact path="/main/*" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route exact path="*" element={<PageNotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
