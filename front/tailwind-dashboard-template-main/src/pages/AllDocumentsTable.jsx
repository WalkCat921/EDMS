import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import ViewDownloadDocument from './ViewDownloadDocument';
import '../css/index.css'


function AllDocumentsTable() {

  const [documentList, setDocumentList] = useState([])

  const loadDocuments = async () => {
    await axios.get("http://localhost:8080/api/doc/all/docs").then(response=>{
      setDocumentList(response.data)
    })
  }

  useEffect(() => {
    loadDocuments();
  }, []);

  const deleteDocument = async (id) => {
    axios.delete(`http://localhost:8080/api/doc/delete/${id}`).then(response=>{
      loadDocuments();
    })
  }


  return (<>
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      <MaterialTable
      title="Все документы"
      columns={[
        { title: 'Название', field: 'name' },
        { title: 'Автор', field:'author' },
        { title: 'Тип', field: 'type' },
        { title: 'Размер (KB)', field:'size', type:'numeric'},
        { title: 'Дата загрузки', field:'creationDate', type: 'datetime' }
      ]}
      data={documentList}
      actions={[
        rowData => ({
          icon: 'delete',
          tooltip: 'Удалить',
          onClick: (event, rowData) => {deleteDocument(rowData.id)}
        })
      ]}
      options={{
        exportButton: true,
      }}
      detailPanel={[
        {
          tooltip: 'Просмотреть',
          render: rowData => {
            const author = rowData.author;
            const fileName = rowData.name;
            return(<ViewDownloadDocument author={author} fileName={fileName}/>)
          },
        },
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

export default AllDocumentsTable;
