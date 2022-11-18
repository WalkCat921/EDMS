import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import LoadUsersList from '../../utils/LoadUsersList';
// import EditMenu from '../EditMenu';
// import 'bootstrap/dist/css/bootstrap.min.css';

function AllUsers() {

  const [userList, setUserList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(()=>{
    loadUser()
  },[]);

  const loadUser = async()=>{
    let resultList = await axios.get("http://localhost:8080/api/users/all")
    setUserList(resultList.data) 
    }

  


  return (
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="p-5">
        <table className="table-fixed w-full">
          <thead className='border border-slate-100'>
            <tr >
              <th colSpan={3} className='border border-slate-100'>Пользователи</th>
            </tr>
          </thead>
          <tbody className='border border-slate-100'>
            <tr>
              <td className='border border-slate-100'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td className='border border-slate-100'>Malcolm Lockyer</td>
              <td className='border border-slate-100'>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>
        {/* <EditMenu className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
            </li>
          </EditMenu> */}
        {/* <h2 className="text-lg font-semibold text-slate-800 mb-2"></h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Sales</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">$17,489</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">-14%</div>
        </div> */}
      </div>
      <div className="grow">
      </div>
    </div>
  )
}

export default AllUsers;
