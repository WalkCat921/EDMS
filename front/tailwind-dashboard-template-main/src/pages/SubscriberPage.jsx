import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import UserAvatar from '../images/user-avatar-32.png';


function Subscribers() {

  const [subsList, setSubsList] = useState([])
  const [showModal, setShowModal] = React.useState(false);
  const [userFromList, setUserFromList] = useState({})
  const [success, setSuccess] = useState(false)
  const [subUsername, setSubUsername] = useState('')

  const loadSubs = async () => {
    await axios.get("http://localhost:8080/api/user/sub/subscribers").then(response=>{
      setSubsList(response.data)
    })
  }

  const deleteSubs = async (id) => {
    await axios.delete(`http://localhost:8080/api/user/sub/delete/subscriber/${id}`)
    setSuccess(true)
    loadSubs()
  }


  useEffect(() => {
    loadSubs();
  }, []);


  return (<>
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="p-5">
      {success && <div class="bg-red-400 text-center py-4 lg:px-4">
        <div class="p-2 bg-red-600 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span class="flex rounded-full bg-red-800 uppercase px-2 py-1 text-xs font-bold mr-3">!</span>
          <span class="font-semibold mr-2 text-left flex-auto">Вы убрали {subUsername} из подписок</span>
        </div>
      </div>}
        <MaterialTable
          title="Подписчики"
          columns={[
            { title: 'Аватар', render:rowData=><img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />},
            { title: 'Имя пользователя', field: 'username'},
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
                onClick: (event, rowData) => {setSubUsername(rowData.username); deleteSubs(rowData.id)}
            }
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
          }}
          localization={{
            body: {
              emptyDataSourceMessage: 'Данных нет'
            },
            header:{
              actions: 'Управление'
            },
            toolbar: {
              searchTooltip: 'Поиск',
              exportPDFName:'Экспорт PDF',
              searchAriaLabel:'Поиск',
              searchPlaceholder:'Поиск...',
              exportCSVName:'Экспорт CSV',
              exportTitle: 'Экспорт'
            },
            pagination: {
              labelRowsSelect: 'записей',
              labelDisplayedRows: ' {from}-{to} записей {count}',
              firstTooltip: 'Начало',
              previousTooltip: 'Назад',
              nextTooltip: 'Далее',
              lastTooltip: 'В конце'
            }
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
                  <div className="relative p-6 flex-auto">
                    <table className="table-fixed w-full">
                      <thead className='border border-slate-200'>
                        <tr>
                          <th colSpan={2} className='border border-slate-300 text-center'>Пользователь</th>
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
                          <th colSpan={2} className='border border-slate-300 text-center'>Информация</th>
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

export default Subscribers;
