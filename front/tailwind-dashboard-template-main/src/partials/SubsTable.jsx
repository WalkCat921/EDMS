import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table'
import { Checkbox, Select, MenuItem } from '@material-ui/core'
import { AddBox, ArrowDownward } from "@material-ui/icons";
import { render } from 'react-dom';
import '../css/index.css'


function SubsTanle({documentUserId, author}) {

  const [subsList, setSubsist] = useState([])
  const [document, setDosument] = useState({})

  const loadSubscribers = async () => {
    let resultList = await axios.get("http://localhost:8080/api/user/sub/subscribers")
    setSubsist(resultList.data)
  }

  const shareDocument = async (userId, documentId) => {
    await axios.post(`http://localhost:8080/api/doc/send/${userId}/${documentId}`).then((resposne)=>{
        alert("+")
    })
  }


  useEffect(() => {
    loadSubscribers();
  }, []);

  return (<>
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <MaterialTable
      title="Подписчики"
      columns={[
        { title: 'Ипя пользователя', field: 'username' },
        { title: 'Email', field: 'email' }
      ]}
      data={subsList.filter(sub=>sub.username!==author)}
      options={{
        selection: true
      }}
      actions={[
        rowData => ({
          icon: 'send',
          tooltip: 'Поделиться',
          onClick: (event, rowData) =>
          rowData.map((user)=>{
            shareDocument(user.id,documentUserId)
          })
        })
      ]}
      localization={{
        body: {
          emptyDataSourceMessage: 'Данных нет'
        },
        toolbar: {
          searchTooltip: 'Поиск',
          nRowsSelected: 'Выбрано'
          
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
