import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Router
} from 'react-router-dom';



import './css/style.css';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"





import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Registration from './pages/Registration';
import DocumentView from './pages/DocumentView';
import UserForm from './partials/user/UserForm';
import PageNotFound from './pages/PageNotFound';

function App() {

  const location = useLocation();

  // useEffect(() => {
  //   document.querySelector('html').style.scrollBehavior = 'auto'
  //   window.scroll({ top: 0 })
  //   document.querySelector('html').style.scrollBehavior = ''
  // }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route excat path="/" element={<Login/>}/>
        <Route excat path="/registration" element={<Registration/>}/>
        <Route exact path="/main/*" element={<Dashboard/>} />
        <Route excat path="/doc" element={<DocumentView/>}/>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
