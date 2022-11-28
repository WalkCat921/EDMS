import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import '../css/index.css'


function SubsTanle({ documentUserId, author }) {

  const [subsList, setSubsist] = useState([])
  const [success, setSuccess] = useState(false)

  const loadSubscribers = async () => {
    let resultList = await axios.get("http://localhost:8080/api/user/sub/subscribers")
    setSubsist(resultList.data)
  }

  const shareDocument = async (userId, documentId) => {
    await axios.post(`http://localhost:8080/api/doc/send/${userId}/${documentId}`).then((resposne) => {

    })
  }


  useEffect(() => {
    loadSubscribers();
  }, []);

  return (<>
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      {success && <div class="bg-indigo-900 text-center py-4 lg:px-4">
        <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
          <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
          <span class="font-semibold mr-2 text-left flex-auto">Get the coolest t-shirts from our brand new store</span>
          <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
        </div>
      </div>}
      <MaterialTable
        title="Подписчики"
        columns={[
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
                shareDocument(user.id, documentUserId)
              })
          })
        ]}
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
  </>
  )
}

export default SubsTanle;
