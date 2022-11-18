import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import LoadUsersList from '../../utils/LoadUsersList';
import EditMenu from '../EditMenu';
// import 'bootstrap/dist/css/bootstrap.min.css';

function AllUsers() {

  const [userList, setUserList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    // loadUser()
  }, []);

  const loadUser = async () => {
    let resultList = await axios.get("http://localhost:8080/api/users/all")
    setUserList(resultList.data)
  }

  const deleteUser = async(id)=>{
    await axios.delete(`http://localhost:8080/api/users/delete/${id}`).
    loadUser()
  }




  return (
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="p-5">
        <table className="table-fixed w-full">
          <thead className='border border-slate-200'>
            <tr >
              <th colSpan={3} className='border border-slate-100'>Пользователи</th>
            </tr>
          </thead>
          <tbody className='border border-slate-100'>
          {
             userList.map(user=>{
                return(
                  <tr key={user.id}>
              <td className='border border-slate-100'>{user.username}</td>
              <td className='border border-slate-100'>{user.email}</td>
              <td className='border border-slate-100'>{
                user.roles.map(role=>role?role.name:null)
              }</td>
              <td className='text-center'><EditMenu className="relative inline-flex">
                <li>
                  <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Изменить</Link>
                </li>
                <li>
                  <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0" onClick={deleteUser(user.id)}>Удалить</Link>
                </li>
              </EditMenu></td>
            </tr>
                )
             })
            }
          </tbody>
        </table>
      </div>
      <div className="grow">
      </div>
    </div>
  )
}

export default AllUsers;
