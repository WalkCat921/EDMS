import * as yup from 'yup';

const phoneNumberExp = /^(\+375|80) \((29|25|44|33)\) (\d{3})\-(\d{2})\-(\d{2})$/;

export const initialSchema = yup.object().shape({
    firstName: yup.string().nullable()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов").notRequired(),
    secondName: yup.string().nullable()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов").notRequired(),
    phoneNumber: yup.string().nullable()
    .matches(phoneNumberExp, {message:"Формат +375 (29|25|44|33) 999-99-99!"}).notRequired(),
    country: yup.string().nullable()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов").notRequired(),
    city: yup.string().nullable()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов").notRequired(),
    street: yup.string().nullable()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов").notRequired(),
    houseNumber: yup.number().nullable()
    .positive()
    .integer()
    .min(1,"Номер дома начинается минимум с 1")
    .max(999,"Вы уверены?").notRequired(),
    flatNumber: yup.number().nullable()
    .positive()
    .integer()
    .min(1,"Номер квартиры начинается минимум с 1")
    .max(999,"Вы уверены?").notRequired()
    
})