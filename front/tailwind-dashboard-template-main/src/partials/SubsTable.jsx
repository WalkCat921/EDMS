import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import UserAvatar from '../images/user-avatar-32.png';
import '../css/index.css'


function SubsTanle({ documentUserId, author }) {

  const [subsList, setSubsList] = useState([])
  const [success, setSuccess] = useState(false)
  const [userShare, setUserShare] = useState([])

  const loadSubscribers = async () => {
    await axios.get("http://localhost:8080/api/user/sub/subscribers").then(response=>{
      setSubsList(response.data)
    })
  }

  const shareDocument = async (userId, documentId) => {
    await axios.post(`http://localhost:8080/api/doc/send/${userId}/${documentId}`).then((resposne) => {
      setSuccess(true)
    })
  }


  useEffect(() => {
    loadSubscribers();
  }, []);

  return (<>
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
    {success && <div class="bg-green-400 text-center py-4 lg:px-4">
        <div class="p-2 bg-green-500 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span class="flex rounded-full bg-green-700 uppercase px-2 py-1 text-xs font-bold mr-3">Успешно!</span>
          <span class="font-semibold mr-2 text-left flex-auto">Вы поделились с {userShare}</span>
        </div>
      </div>}
      <MaterialTable
        title="Подписчики"
        columns={[
          { title: 'Аватар', render:rowData=><img className="w-8 h-8 rounded-full" src={UserAvatar} width="32" height="32" alt="User" />},
          { title: 'Ипя пользователя', field: 'username' },
          { title: 'Email', field: 'email' }
        ]}
        data={subsList.filter(sub => sub.username !== author)}
        options={{
          selection: true
        }}
        actions={[
          rowData => ({
            icon: 'send',
            tooltip: 'Поделиться',
            onClick: (event, rowData) =>
              rowData.map((user) => {
                userShare.push(user.username);
                userShare.push(' ')
                shareDocument(user.id, documentUserId)
              })
          })
        ]}
        localization={{
          body: {
            emptyDataSourceMessage: 'Данных нет'

          },
          header:{
            actions: 'Управление',

          },
          toolbar: {
            nRowsSelected:'{0} выбрано',
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
  </>
  )
}

export default SubsTanle;
