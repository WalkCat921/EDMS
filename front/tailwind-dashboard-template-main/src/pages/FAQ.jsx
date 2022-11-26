import { Fragment, useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
 
export default function FAQ() {
  const [open, setOpen] = useState(1);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (<>
  <div className="col-span-full pr-6 dark:bg-gray-900 xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">

     <Fragment>
      <Accordion open={open === 1} style={{margin:'15px'}}>
        <AccordionHeader style={{color:'white'}} onClick={() => handleOpen(1)}>
          Как сменить пароль?
        </AccordionHeader>
        <AccordionBody>
            <strong style={{color:'white', fontSize:'15px'}}>
            Для смены пароля требуеться связаться с <a style={{textDecoration:'underline'}} href="/main/help/support">Тех.Поддержкой</a>.
            Укажите тему письма, как "Смена пароля".
            В письме укажите ваш текущий пароль и введите новый. 
            В течение какого-то времени с Вами свяжутся для подтверждения информации.  
             </strong>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} style={{margin:'15px'}}>
        <AccordionHeader style={{color:'white'}} onClick={() => handleOpen(2)}>
          Как загрузить документ?
        </AccordionHeader>
        <AccordionBody>
          <p style={{color:'white', fontSize:'15px'}}>Для загрузки документа требуеться открыть на боковой панеле меню "Документы". Далее, выбрать пункт "Загрузить документ". 
          После отобразиться панель для загрузки документа. Затем нажмите на кнопку "Выберите файл" и выберите свой файл. <strong style={{color:'red'}}>Файл обязательно должен быть в формате PDF</strong></p>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} style={{margin:'15px'}}>
        <AccordionHeader style={{color:'white'}} onClick={() => handleOpen(3)}>
          What can I do with Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          We're not always in the position that we want to be at. We're
          constantly growing. We're constantly making mistakes. We're constantly
          trying to express ourselves and actualize our dreams.
        </AccordionBody>
      </Accordion>
    </Fragment>
    </div>
    </>
  );
}