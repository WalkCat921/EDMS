import * as yup from 'yup';

const phoneNumberExp = /^(\+375|80) \((29|25|44|33)\) (\d{3})\-(\d{2})\-(\d{2})$/;

export const initialSchema = yup.object().shape({
    firstName: yup.string()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов"),
    secondName: yup.string()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов"),
    phoneNumber: yup.string()
    .matches(phoneNumberExp, {message:"Формат +375 (29|25|44|33) 999-99-99!"}),
    country: yup.string()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов"),
    city: yup.string()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов"),
    street: yup.string()
    .min(2,"Слишком короткое. Минимум 2 символа")
    .max(50,"Слишком большое. Максимум 50 символов"),
    houseNumber: yup.number()
    .positive()
    .integer()
    .min(1,"Номер дома начинается минимум с 1")
    .max(999,"Вы уверены?"),
    flatNumber: yup.number()
    .positive()
    .integer()
    .min(1,"Номер квартиры начинается минимум с 1")
    .max(999,"Вы уверены?")
    
})