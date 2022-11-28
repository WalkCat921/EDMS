import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';
import { Doughnut } from 'react-chartjs-2';

function DashboardCard10() {

  const [userList, setUserList] = useState([])
  const [statisticUser, setStatisticUser] = useState([])
  const [count, setCount] = useState([])

  useEffect(() => {
    loadUser()
  }, []);

  const loadUser = async () => {
    await axios.get("http://localhost:8080/api/users/all").then(response=>{
    setUserList(response.data)
    })
    await axios.get('http://localhost:8080/api/dashboard/users/documents').then(response=>{
      setStatisticUser(response.data)
    })
  }

 
  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Пользователи</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="max-h-80 overflow-x-auto overflow-y-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Имя</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Email</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Документов</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Статус</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100">
              {
                userList.map(user=>{
                  return(
                    <tr key={user.id}>
                      <td className="p-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            {/* <img className="rounded-full" src={customer.image} width="40" height="40" alt={user.username} /> */}
                          </div>
                          <div className="font-medium text-slate-800">{user.username}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{user.email}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{statisticUser[user.username]}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{
                  user.roles.map(role=>role?role.name.substr(5).toLowerCase():null)
                }</div>
                      </td>
                </tr>
                  )
              })
            }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;