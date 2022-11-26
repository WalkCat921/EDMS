import React, { useEffect, useState } from 'react';
import { Router, Routes } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Navigate } from 'react-router-dom';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import FilterButton from '../partials/actions/FilterButton';
// import Datepicker from '../partials/actions/Datepicker';
import { Route, useLocation } from 'react-router-dom';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
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



function Dashboard() {


  const mainDashboardComponents = [<>
    <DashboardCard01 />
    <DashboardCard02 />
    <DashboardCard03 />
    <DashboardCard04 />
    <DashboardCard05 />
    <DashboardCard06 />
    <DashboardCard07 />
    <DashboardCard08 />
    <DashboardCard09 />
    <DashboardCard10 />
    <DashboardCard11 />
    <DashboardCard12 />
    <DashboardCard12 />
    <DashboardCard13 />
  </>]
  const allUsersForAdmin = [<><AllUsersForAdmin/></>]
  const allUsersTable = [<><AllUsersTable/></>]
  const userForm = [<><UserForm /></>]
  const docViewer = [<><DocumentView /></>]
  const addDocument = [<><AddDocument /></>]
  const allDocuments = [<><AllDocumentsTable/></>]
  const userDocuments = [<><UserDocuments/></>]
  const userSubscriptions = [<><Subscriptions/></>]
  const userSubscribers = [<><Subscribers/></>]
  const helpFAQ = [<><FAQ/></>]
  const helpSupport = [<><Support/></>]
  const location = useLocation();
  const [components, setComponents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo?.token) {
      AuthTokenResponse(userInfo.token)
    }
  })


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

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
              <Routes>
                <Route exact path='/' element={mainDashboardComponents} />
                <Route exact path="/users" element={allUsersTable} />
                <Route exact path="/user/profile" element={userForm} />
                <Route excat path='/user/documents' element={userDocuments}/>
                <Route excat path='/user/subscriptions' element={userSubscriptions}/>
                <Route excat path='user/subscribers' element={userSubscribers}/>
                <Route excat path='/document' element={docViewer} />
                <Route excat path='/document/add' element={addDocument} />
                <Route excat path='/admin/documents' element={allDocuments}/>
                <Route excat path='/admin/users' element={allUsersForAdmin}/>
                <Route excat path='/help/faq' element={helpFAQ}/>
                <Route excat path='/help/support' element={helpSupport}/>
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