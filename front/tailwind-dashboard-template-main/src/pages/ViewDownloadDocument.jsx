import { useEffect, useState } from "react";
import { Worker } from '@react-pdf-viewer/core';
import { Viewer, ProgressBar } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { dropPlugin } from '@react-pdf-viewer/drop';
import axios from "axios";

import '../css/index.css'

export default function ViewDownloadDocument({author, fileName}) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const dropPluginInstance = dropPlugin();

  const [pdfFile, setPdfFile] = useState(null);



  useEffect(()=>{
    getFileByName(author,fileName)
    console.log(pdfFile)
  },[])


  const getFileByName = (userName,name)=>{
    let file = axios.get(`http://localhost:8080/api/doc/download/${userName}/${name}`,{
      responseType: 'blob',
    }).then(response=>{
      let readerResp = new FileReader();
      readerResp.readAsDataURL(response.data)
      readerResp.onloadend=(e)=>{
        setPdfFile(e.target.result)
      }
    }).catch((error)=>{
      alert(error)
    })
  }
  return (
      <div className="viewer">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js">
            <Viewer theme={{
              theme: 'dark',
            }} fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance, dropPluginInstance]}
              renderLoader={(percentages) => (
                <div style={{ width: '240px' }}>
                  <ProgressBar progress={Math.round(percentages)} />
                </div>
              )}
            ></Viewer>
          </Worker>
        )}
        {!pdfFile && <>Файл не выбран</>}
      </div>
  );
}