import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table'
import {useCurrentUser} from '../utils/useCurrentUser'
import { Checkbox, Select, MenuItem } from '@material-ui/core'
import { AddBox, ArrowDownward } from "@material-ui/icons";


function Subscriptions() {

  const [subsList, setSubsList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [showModal, setShowModal] = React.useState(false);
  const [userFromList, setUserFromList] = useState({})
  // const [currentUser, setCurrentUser] = useCurrentUser();
  // const [filter, setFilter]=useState(true)

  const loadSubs = async () => {
    let resultList = await axios.get("http://localhost:8080/api/user/sub/subscriptions")
    setSubsList(resultList.data)
  }

  const deleteSubs = async (id) => {
    await axios.delete(`http://localhost:8080/api/user/sub/delete/subscription/${id}`)
    loadSubs();
  }


  useEffect(() => {
    loadSubs();
  }, []);


  return (<>
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="p-5">
        <MaterialTable
          title="Пользователи"
          columns={[
            { title: 'Имя пользователя', field: 'username' },
            { title: 'Email', field: 'email' },

          ]}
          data={subsList}
          actions={[
            {
              icon: 'person',
              tooltip: 'Профиль',
              onClick: (event, rowData) => {setShowModal(true); setUserFromList(rowData) }
            },
            {
                icon: 'person_remove',
                tooltip: 'Отписаться',
                onClick: (event, rowData) => {deleteSubs(rowData.id)}
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
          }}
          
        />

      </div>
      <div className="grow">
      </div>
    </div>
    <div>
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      {userFromList.username}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="text-black text-black block  focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <table className="table-fixed w-full">
                      <thead className='border border-slate-200'>
                        <tr>
                          <th colSpan={2} className='border border-slate-300 text-center'>Пользователи</th>
                        </tr>
                      </thead>
                      <tbody className='border border-slate-300'>
                        <tr>
                          <td className='border border-slate-300'>ID</td>
                          <td className='border border-slate-300'>{userFromList.id}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Имя пользователя</td>
                          <td className='border border-slate-300'>{userFromList.username}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Email</td>
                          <td className='border border-slate-300'>{userFromList.email}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Статус</td>
                          <td className='border border-slate-300'>{userFromList.roles.map(role => role.name.substr(5).toLowerCase()==='user' ? 'Пользователь' : 'Администратор')}</td>
                        </tr>
                        <tr>
                          <td colSpan={2} className='border border-slate-300 text-center'>Информация</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Фамилия</td>
                          <td className='border border-slate-300'>{userFromList.person?.secondName}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Имя</td>
                          <td className='border border-slate-300'>{userFromList.person?.firstName}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Телефон</td>
                          <td className='border border-slate-300'>{userFromList.person?.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Дата рождения</td>
                          <td className='border border-slate-300'>{userFromList.person?.birthdate}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Страна</td>
                          <td className='border border-slate-300'>{userFromList.person?.address?.country}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Город</td>
                          <td className='border border-slate-300'>{userFromList.person?.address?.city}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Улица</td>
                          <td className='border border-slate-300'>{userFromList.person?.address?.street}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>№ дома</td>
                          <td className='border border-slate-300'>{userFromList.person?.address?.houseNumber}</td>
                        </tr>
                        <tr>
                          <td className='border border-slate-300'>Квартира</td>
                          <td className='border border-slate-300'>{userFromList.person?.address?.flatNumber}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Закрыть
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    </div>
  </>
  )
}

export default Subscriptions;
