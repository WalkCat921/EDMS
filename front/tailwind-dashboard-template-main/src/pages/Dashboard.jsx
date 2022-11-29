import React, { useEffect, useState } from 'react';
import { Router, Routes } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import { Route, useLocation } from 'react-router-dom';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import Banner from '../partials/Banner';
import DocumentView from '../pages/DocumentView';
import AddDocument from '../pages/AddDocument';
import UserForm from '../partials/user/UserForm';
import AllDocumentsTable from '../pages/AllDocumentsTable';
import AllUsersTable from '../partials/user/AllUsersTable';
import AllUsersForAdmin from '../partials/admin/AllUsersForAdmin';
import UserDocuments from '../partials/user/UserDocuments';
import Subscriptions from './SubscriptionsPage';
import Subscribers from './SubscriberPage';
import FAQ from './FAQ';
import Support from './Suppport';
import AuthTokenResponse from '../utils/AuthTokenResponse'
import OnlyAdminRoute from '../utils/OnlyAdminRoute';
import PageNotFound from './PageNotFound'
import DashboardCard02 from '../partials/dashboard/DashboardCard02';



function Dashboard() {
  const mainDashboardComponents = [<>
    <DashboardCard01 />
    <DashboardCard02 />
    <DashboardCard06 />
    <DashboardCard07 />
    <DashboardCard10 />
  </>]
  const allUsersForAdmin = [<><AllUsersForAdmin /></>]
  const allUsersTable = [<><AllUsersTable /></>]
  const userForm = [<><UserForm /></>]
  const docViewer = [<><DocumentView /></>]
  const addDocument = [<><AddDocument /></>]
  const allDocuments = [<><AllDocumentsTable /></>]
  const userDocuments = [<><UserDocuments /></>]
  const userSubscriptions = [<><Subscriptions /></>]
  const userSubscribers = [<><Subscribers /></>]
  const helpFAQ = [<><FAQ /></>]
  const helpSupport = [<><Support /></>]
  const location = useLocation();
  const [components, setComponents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo?.token) {
      AuthTokenResponse(userInfo.token)
    }
  }, [])


  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <WelcomeBanner />
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <Routes>
                <Route exact path='/'/>
                <Route exact path='/admin/dashboard' element={
                  <OnlyAdminRoute>
                    {mainDashboardComponents}
                  </OnlyAdminRoute>
                } />
                <Route exact path="/users" element={allUsersTable} />
                <Route exact path="/user/profile" element={userForm} />
                <Route excat path='/user/documents' element={userDocuments} />
                <Route excat path='/users/user/subscriptions' element={userSubscriptions} />
                <Route excat path='/users/user/subscribers' element={userSubscribers} />
                <Route excat path='/document/pdf' element={docViewer} />
                <Route excat path='/document/pdf/add' element={addDocument} />
                <Route excat path='/admin/doc' element={
                  <OnlyAdminRoute>
                    {allDocuments}
                  </OnlyAdminRoute>
                } />
                <Route excat path='/admin/allUsr' element={
                  <OnlyAdminRoute>
                    {allUsersForAdmin}
                  </OnlyAdminRoute>
                } />
                <Route excat path='/help/faq' element={helpFAQ} />
                <Route excat path='/help/support' element={helpSupport} />
                <Route excat path='/*' element={<><div className='col-span-12'><PageNotFound/></div></>}/>
              </Routes>
            </div>
          </div>
        </main>
        <Banner />
      </div>
    </div>
  );
}

export default Dashboard;