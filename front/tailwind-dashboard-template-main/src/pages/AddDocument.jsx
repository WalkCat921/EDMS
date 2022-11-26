import { useState } from "react";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer, ProgressBar } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useForm } from 'react-hook-form'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { dropPlugin } from '@react-pdf-viewer/drop';
import { Button, Tooltip } from '@mui/material';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import '../css/index.css'

function AddDocument() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const dropPluginInstance = dropPlugin();

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState('');
  const [isAlertHidden, setIsAlertHidden] = useState(false)
  const [documentName, setDocumentName] = useState('')
  const [fileForm, setFileForm] = useState(new FormData())
  let navigate = useNavigate()

  const {
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur"
  })

  const handleDocumentLoad = (e) => {

  };

  const handleHideAlert = () => {
    setIsAlertHidden(!isAlertHidden);
  }

  const handleDocNameChange = (e) => {
    setDocumentName(e.target.value)
  }

  const uploadFile = async (file,fileName) =>{
    await axios.put("http://localhost:8080/api/doc/add", file,{
      params:{fileName}
    }).then(response=>{
      navigate("/main/user/documents")
    })
  }
  const allowedFiles = ['application/pdf'];
  const handleFile = (e) => {
    let selectedFile=e.target.files[0]
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        let file = new FormData();
        setDocumentName(selectedFile.name)
        file.append('file',selectedFile)
        setFileForm(file)
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target.result);
        }
      }
      else {
        setPdfError('Неверный формат. Требуется PDF!');
        setPdfFile('');
      }
    }
    else {
      setPdfError('Файл не выбран!');
      setPdfFile('');
    }
  }

  return (
    <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
      {pdfFile &&
        <div className="flex flex-wrap mb-6 justify-center mt-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Название документа:
            </label>
            <input
              {...register('fileName', {
                required: "Имя файла не может быть пустым",
                pattern: {
                  value: /^[\d\wА-Яа-я]{1}.*\.(pdf)$/,
                  message: "Неверный фоматр названия! Имя файла начинаеться с буквы/цифры. В конце файла должен быть тип .pdf"
                }

              })}
              name='fileName'
              onChange={(e) => handleDocNameChange(e)} value={documentName} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Введите название документа" />
          </div>
          {<Tooltip title='Принять'>
            <Button type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-6 mr-4" onClick={() =>uploadFile(fileForm,documentName)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.9" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>

            </Button>
          </Tooltip>}
          <div>
            {errors?.fileName && <div className="p-2 mt-5 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
              {errors?.fileName?.message}
            </div>}
          </div>
        </div>
      }
      <form className="w-full max-w">
        <div className="flex flex-wrap mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            {
              pdfError && <div role="alert" hidden={isAlertHidden}>
                <div class="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  <div className="inline-flex">
                    Ошибка
                    <svg onClick={() => handleHideAlert()} class="fill-current h-6 w-6 text-red-100" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                  </div>
                </div>
                <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700 mb-6">
                  <p>{pdfError}</p>
                </div>
              </div>
            }
            <label className="block text-center uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
              PDF документ для загрузки
            </label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" accept=".pdf" type="file" onChange={handleFile} />
          </div>
        </div>
      </form>
      <label className="block uppercase tracking-wide text-gray-700 text-lg font-bold mb-2 text-center" >
        Просмотр документа
      </label>
      <div className="viewer">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <Viewer theme={{
              theme: 'dark',
            }} fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance, dropPluginInstance]}
              onDocumentLoad={handleDocumentLoad}
              renderLoader={(percentages) => (
                <div style={{ width: '240px' }}>
                  <ProgressBar progress={Math.round(percentages)} />
                </div>
              )}
            ></Viewer>
          </Worker>
        )}
        {!pdfFile && <>Файл для загрузки не выбран</>}
      </div>
    </div>
  );
}


export default AddDocument;