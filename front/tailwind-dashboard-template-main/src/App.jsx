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
import UserLogged from './utils/UserLogged';

function App() {
  
  return (
    <>
      <Routes>
        <Route excat path="/" element={
          <UserLogged>
            <Login />
          </UserLogged>
        } />
        <Route excat path="/registration" element={
          <UserLogged>
          <Registration />
        </UserLogged>
        } />
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
