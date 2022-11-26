import { Button, Input, Tooltip } from '@mui/material';
import axios from 'axios'
import { useController, useForm } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { DevTool } from "@hookform/devtools";
import { Link } from 'react-router-dom';
import EditMenu from '../EditMenu';
import InputMask from "react-input-mask";
import { toJSON, fromJSON } from 'flatted';

export default function UserForm() {

    const [isApplyButtonAvaible, setIsApplyButtonAvaible] = useState(false);
    const [isFieldAvaible, setIsFieldAvaible] = useState(false);
    const [isEditButtonPressed, setIsEditButtonPressed] = useState(false);
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [address, setAddress] = useState({
        country: '',
        city: '',
        street: '',
        flatNumber: '',
        houseNumber: ''
    })
    const [person, setPerson] = useState({
        firstName: '',
        phoneNumber: '',
        secondName: '',
        address: address
    })
    const [user, setUser] = useState({
        username: '',
        email: '',
        person: person
    })

    const {
        register,
        setValue,
        formState: {
            errors,
        },
        control,
        handleSubmit
    } = useForm({
        mode:'onBlur'
    })
    useEffect(() => {
        getUser()
    }, []);


    

    const handleEditButton = () => {
        setIsFieldAvaible(!isFieldAvaible)
        setIsApplyButtonAvaible(!isApplyButtonAvaible)
        setIsEditButtonPressed(!isEditButtonPressed)

    }

    const onUserInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onPersonInput = (e) => {
        setPerson({ ...person, [e.target.name]: e.target.value })
        user.person = person
    }

    const onAddressInput = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
        user.person.address = address
    }

    const onPasswordInput = (e) => {
        setNewPassword(e.target.value)
    }

    const onSubmit = () => {
        if(errors){alert(JSON.stringify(errors))}else {
            alert('false')
        }
        setIsFieldAvaible(!isFieldAvaible)
        setIsApplyButtonAvaible(false)
        if(newPassword){
            user.password = newPassword;
        }
        personData(user)
    }

    const getUser = async () => {
        const userResponseData = await axios.get(`http://localhost:8080/api/users/user/${JSON.parse(localStorage.getItem('userInfo')).id}`)
        setUser(userResponseData.data)
        setPerson(userResponseData.data.person)
        setAddress(userResponseData.data.person.address)
    }

    const personData = (userData) => {
        axios.put(`http://localhost:8080/api/users/edit/${userData.id}`, userData).then(response => {
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            location.reload()
        })
    }

    // const 

    return (<>
        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
            <form className="w-full max-w " onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-wrap mb-6 justify-center">
                    <div className="w-full md:w-1/2 px-3 mb-6 ">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs text-center font-bold mb-2" for="grid-first-name">
                            Личный номер:{user.id}
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="hidden" value={user?.id} placeholder="Имя пользователя" />
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Имя пользователя:
                        </label>
                        <input
                            name='username'
                            value={user?.username}
                            {...register('username', {
                                required: "Обязательное поле",

                            })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="text"
                            placeholder="Имя пользователя"
                            onChange={(e) => onUserInput(e)}
                        />
                        <div>
                        {errors?.username && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.username?.message}
                        </div>}
                    </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Email:
                        </label>
                        <input
                        {...register('email', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Не соответствует образцу!"
                                }

                            })}
                            name='email'
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="text"
                            value={user?.email}
                            placeholder="Email"
                            onChange={(e) => onUserInput(e)}
                        />
                        <div>
                        {errors?.email && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.email?.message}
                        </div>}
                    </div>
                    </div>
                    {/* <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Новый пароль:
                        </label>
                        <input
                            {...register('newPassword', {
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,20}$/,
                                    message: "Длина пароля должна состовлять 7-20 символов. Содержать минимум один символ верхнего и нижнего регистра. Содержать минимум одну цифру"
                                }

                            })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="password"
                            name='newPassword'
                            placeholder="Новый пароль" 
                            onChange={(e) => onPasswordInput(e)}
                            />
                            <div>
                        {errors?.newPassword && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.newPassword?.message}
                        </div>}
                    </div>
                    </div> */}
                    {/* <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Повтор нового пароля:
                        </label>
                        <input
                        {...register('confirmPassword', {
                            validate: value => value === newPassword || "Пароли не совпадают!",
                        })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="password"
                            name='confirmPassword'
                            placeholder="Повтор нового пароля" 
                        onInput={e => setConfirmPassword(e.target.value)}
                        />
                            <div>
                        {errors?.confirmPassword && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.confirmPassword?.message}
                        </div>}
                    </div>
                    </div> */}
                    
                </div>
                <div className="flex flex-wrap mb-6 justify-center text-center">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            <div className='inline-flex mt-6'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 2 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>
                                <p className='ml-3'>Личные данные</p>
                            </div>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="hidden" value={user?.id} placeholder="Имя пользователя" />
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Фамилия:
                        </label>
                        <input
                            {...register('secondName', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^([a-zA-z]{2,}|[А-яЁё]{2,})$/,
                                    message: "Фамилия должна состять минимум из 2 букв. Не содержать символов"
                                }

                            })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            value={person?.secondName}
                            type="text"
                            name='secondName'
                            placeholder="Фамилия"
                            onChange={(e) => onPersonInput(e)}
                        />
                        <div>
                        {errors?.secondName && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.secondName?.message}
                        </div>}
                    </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Имя:
                        </label>
                        <input
                            {...register('firstName', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^([a-zA-z]{2,}|[А-яЁё]{2,})$/,
                                    message: "Имя должно состять минимум из 2 букв. Не содержать символов"
                                }
                            })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            value={person?.firstName}
                            type="text"
                            name='firstName'
                            placeholder="Имя"
                            onChange={(e) => onPersonInput(e)}
                            />
                            <div>
                        {errors?.firstName && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.firstName?.message}
                        </div>}
                    </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Телефон:
                        </label>
                        <InputMask
                        alwaysShowMask={true}
                        mask='+375 (99) 999-99-99'
                            {...register('phoneNumber', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^(\+375|80) \((29|25|44|33)\) (\d{3})\-(\d{2})\-(\d{2})$/,
                                    message: "Формат +375 (29|25|44|33) 999-99-99!"
                                }
                            })}
                            inputMode="numeric"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={person?.phoneNumber}
                            type="text"
                            name='phoneNumber'
                            placeholder="Телефон"
                            onChange={(e) => onPersonInput(e)}
                        />
                        <div>
                        {errors?.phoneNumber && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.phoneNumber?.message}
                        </div>}
                    </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Страна:
                        </label>
                        <input
                            {...register('country', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^([a-zA-z]{2,}|[А-яЁё]{2,})$/,
                                    message: "Страна должна состять минимум из 2 букв. Не содержать символов"
                                }
                            })}
                            value={address?.country}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="text"
                            name='country'
                            placeholder="Страна"
                            onChange={(e) => onAddressInput(e)}
                        />
                        <div>
                        {errors?.country && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.country?.message}
                        </div>}
                    </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Город:
                        </label>
                        <input
                            value={address?.city}
                            {...register('city', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^([a-zA-z]{2,}|[А-яЁё]{2,})$/,
                                    message: "Город должен состять минимум из 2 букв. Не содержать символов"
                                }
                            })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="text"
                            name='city'
                            placeholder="Город"
                            onChange={(e) => onAddressInput(e)}
                        />
                        <div>
                        {errors?.city && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.city?.message}
                        </div>}
                    </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Улица:
                        </label>
                        <input
                            {...register('street', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^([a-zA-z]{2,}|[А-яЁё]{2,})$/,
                                    message: "Улица должна состять минимум из 2 букв. Не содержать символов"
                                }
                            })}
                            value={address?.street}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="text"
                            name='street'
                            placeholder="Улица/Проспект"
                            onChange={(e) => onAddressInput(e)}
                        />
                        <div>
                        {errors?.street && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.street?.message}
                        </div>}
                    </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Номер дома:
                        </label>
                        <input
                            {...register('houseNumber', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^[\d]{1,5}$/,
                                    message: "Номер дома должен состоять из цифр. Неболее 5"
                                }

                            })}
                            value={address?.houseNumber}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="number"
                            name='houseNumber'
                            placeholder="Номер дома"
                            onChange={(e) => onAddressInput(e)}
                        />
                        <div>
                        {errors?.houseNumber && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.houseNumber?.message}
                        </div>}
                    </div>
                        {/* <div>
                                {errors?.houseNumber && <div class="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                    {errors?.houseNumber?.message}
                                </div>}
                            </div> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Номер квартиры:
                        </label>
                        <input
                            {...register('flatNumber', {
                                required: "Обязательное поле",
                                pattern: {
                                    value: /^[\d]{1,5}$/,
                                    message: "Номер квартире должен состоять из цифр. Неболее 5"
                                }
                            })}
                            value={address?.flatNumber}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            // disabled={!isFieldAvaible}
                            type="number"
                            name='flatNumber'
                            placeholder="Номер квартиры"
                            onChange={(e) => onAddressInput(e)}
                        />
                        <div>
                        {errors?.flatNumber && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            {errors?.flatNumber?.message}
                        </div>}
                    </div>
                    </div>
                    <div className="w-full md:w-1/1 px-3">
                        <div class="inline-flex">
                            {/* <Tooltip title='Редактировать'>
                                <Button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 mr-4" onClick={(e) => handleEditButton(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </Button>

                            </Tooltip> */}
                            {/* <Tooltip title='Принять'> */}
                                <button type='submit' class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 mr-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </button>
                            {/* </Tooltip> */}
                        </div>
                    </div>
                </div>
            </form>
            <DevTool control={control} />
        </div>
    </>
    )
}
