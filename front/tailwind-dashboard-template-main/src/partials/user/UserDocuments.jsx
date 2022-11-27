import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table'
import { Checkbox, Select, MenuItem } from '@material-ui/core'
import { AddBox, ArrowDownward } from "@material-ui/icons";
import { render } from 'react-dom';
import ViewDownloadDocument from '../../pages/ViewDownloadDocument';
import '../../css/index.css'
import SubsTable from '../SubsTable';


function UserDocuments() {

  const [documentList, setDocumentList] = useState([])
  const [document, setDosument] = useState({})

  const loadDocuments = async () => {
    let resultList = await axios.get("http://localhost:8080/api/doc/mydocs")
    setDocumentList(resultList.data)
  }

  const checkDoc = {
    tooltip: 'Просмотреть',
    render: rowData => {
      const author = rowData.author;
      const fileName = rowData.name;
      return(<ViewDownloadDocument author={author} fileName={fileName}/>)
    },
  }
   const shareDoc = {
      icon: 'share',
      tooltip: 'Поделится',
      render: rowData => {
        return(<SubsTable documentUserId={rowData.id}/>)
      },
   } 


  useEffect(() => {
    loadDocuments();
  }, []);

  const deleteDocument = async (id) => {
    axios.delete(`http://localhost:8080/api/doc/delete/${id}`).then(() => { loadDocuments() }).catch((err)=>{
      alert(err)
    })
  }

  return (<>
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <MaterialTable
      title="Документы"
      columns={[
        { title: 'Название', field: 'name' },
        { title: 'Автор', field:'author'},
        { title: 'Тип', field: 'type' },
        { title: 'Размер (KB)', field:'size'},
        { title: 'Дата загрузки', field:'creationDate', type: 'datetime' }
      ]}
      data={documentList}
      actions={[
        rowData => (JSON.parse(localStorage.getItem('userInfo')).username===rowData.author&&{
          icon:'delete',
          tooltip:'Удалить',
          onClick:(event, rowData)=>deleteDocument(rowData.id)
        })
      ]}
      detailPanel={[
        {
          tooltip: 'Просмотреть',
          render: rowData => {
            const author = rowData.author;
            const fileName = rowData.name;
            return(<ViewDownloadDocument author={author} fileName={fileName}/>)
          },
        },
        {
          icon: 'share',
          tooltip: 'Поделится',
          render: rowData => {
            return(<SubsTable author={rowData.author} documentUserId={rowData.id}/>)
          },
        },
      ]}
      localization={{
        body: {
          emptyDataSourceMessage: 'Данных нет'
        },
        toolbar: {
          searchTooltip: 'Поиск'
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

export default UserDocuments;
