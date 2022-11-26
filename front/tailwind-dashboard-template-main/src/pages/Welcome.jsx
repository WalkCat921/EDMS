import React, { useEffect, useState } from 'react';
import { Router, Routes } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Navigate } from 'react-router-dom';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import { Route, useLocation } from 'react-router-dom';
import AuthTokenResponse from '../utils/AuthTokenResponse'



function Welcome() {


//   const mainDashboardComponents = [<>
//     <DashboardCard01 />
//     <DashboardCard02 />
//     <DashboardCard03 />
//     <DashboardCard04 />
//     <DashboardCard05 />
//     <DashboardCard06 />
//     <DashboardCard07 />
//     <DashboardCard08 />
//     <DashboardCard09 />
//     <DashboardCard10 />
//     <DashboardCard11 />
//     <DashboardCard12 />
//     <DashboardCard12 />
//     <DashboardCard13 />
//   </>]
//   const allUsersForAdmin = [<><AllUsersForAdmin/></>]
//   const allUsersTable = [<><AllUsersTable/></>]
//   const userForm = [<><UserForm /></>]
//   const docViewer = [<><DocumentView /></>]
//   const addDocument = [<><AddDocument /></>]
//   const allDocuments = [<><AllDocumentsTable/></>]
//   const userDocuments = [<><UserDocuments/></>]
//   const userSubscriptions = [<><Subscriptions/></>]
//   const userSubscribers = [<><Subscribers/></>]
//   const helpFAQ = [<><FAQ/></>]
//   const helpSupport = [<><Support/></>]
//   const location = useLocation();
//   const [components, setComponents] = useState([]);
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
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              </div>

            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Welcome;