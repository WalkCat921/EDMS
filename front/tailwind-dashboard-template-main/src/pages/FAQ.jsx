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
        <Accordion open={open === 1} style={{ margin: '15px' }}>
          <AccordionHeader style={{ color: 'white' }} onClick={() => handleOpen(1)}>
            Как сменить пароль?
          </AccordionHeader>
          <AccordionBody>
            <strong style={{ color: 'white', fontSize: '15px' }}>
              Для смены пароля требуеться связаться с <a style={{ textDecoration: 'underline' }} href="/main/help/support">Тех.Поддержкой</a>.
              Укажите тему письма, как "Смена пароля".
              В письме укажите ваш текущий пароль и введите новый.
              В течение какого-то времени с Вами свяжутся для подтверждения информации.
            </strong>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2} style={{ margin: '15px' }}>
          <AccordionHeader style={{ color: 'white' }} onClick={() => handleOpen(2)}>
            Как загрузить документ?
          </AccordionHeader>
          <AccordionBody>
            <p style={{ color: 'white', fontSize: '15px' }}>Для загрузки документа требуеться открыть на боковой панеле меню "Документы". Далее, выбрать пункт "Загрузить документ".
              После отобразиться панель для загрузки документа. Затем нажмите на кнопку "Выберите файл" и выберите свой файл. <strong style={{ color: 'red' }}>Файл обязательно должен быть в формате PDF</strong></p>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3} style={{ margin: '15px' }}>
          <AccordionHeader style={{ color: 'white' }} onClick={() => handleOpen(3)}>
            Как просмотреть статистику?
          </AccordionHeader>
          <AccordionBody>
            <p style={{ color: 'white', fontSize: '15px' }}>На данный момент просмотреть абсолютно всю статистику может только Администратор. Остальные пользователи доступ
              к статистике не имеют.</p>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 4} style={{ margin: '15px' }}>
          <AccordionHeader style={{ color: 'white' }} onClick={() => handleOpen(4)}>
            Как получить права администратора?
          </AccordionHeader>
          <AccordionBody>
            <p style={{ color: 'white', fontSize: '15px' }}>Права администратора можно получить только при написании в <a style={{ textDecoration: 'underline' }} href="/main/help/support">Тех.поддержку</a> письма с заголовком "Права администратора". В
              дальнейшем запрос на предоставление прав администратор будет рассмотриваться главным администратором. В случае
              одобрения главным администратором вашего запроса к Вам на почту будет отправлено сообщение с положительным ответом.
              Если ответного письма нет, получение прав администратора <strong style={{ color: 'red' }}>невозможно</strong>.</p>
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 5} style={{ margin: '15px' }}>
          <AccordionHeader style={{ color: 'white' }} onClick={() => handleOpen(5)}>
            Не нашли вопрос?
          </AccordionHeader>
          <AccordionBody>
            <p style={{ color: 'white', fontSize: '15px' }}>Обратитесь в <a style={{ textDecoration: 'underline' }} href="/main/help/support">Тех.поддержку</a> для получения полного ответа. С Вами свяжуться
              в течение 2-3 дней.</p>
          </AccordionBody>
        </Accordion>

      </Fragment>
    </div>
  </>
  );
}