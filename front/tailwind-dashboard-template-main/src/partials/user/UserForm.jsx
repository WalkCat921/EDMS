import React, { useState } from 'react'
import { setIn, useFormik } from 'formik'
import { initialSchema } from '../../utils/initialSchema';
import axios from 'axios';
import { useEffect } from 'react';
import InputMask from "react-input-mask";
export default function UserForm() {


    const [user, setUser] = useState({})
    const [person, setPerson] = useState({})
    const [address, setAddress] = useState({})
    const [userRequest, setUserRequest] = useState({
        person: {
            firstName: '',
            secondName: '',
            phoneNumber: '',
            address: {
                country: '',
                city: '',
                street: '',
                houseNumber: '',
                flatNumber: '',
            }
        }
    })

    useEffect(() => {
        getUser()
    }, [])

    const initUserData = () => {
        userRequest.person.firstName = values.firstName
        userRequest.person.secondName = values.secondName
        userRequest.person.phoneNumber = values.phoneNumber
        userRequest.person.address.country = values.country
        userRequest.person.address.city = values.city
        userRequest.person.address.street = values.street
        userRequest.person.address.houseNumber = values.houseNumber
        userRequest.person.address.flatNumber = values.flatNumber

    }

    const onSubmit = () => {
        initUserData()
        sendUser();
        console.log(userRequest)
    }

    const { values, errors, isSubmitting, handleChange, handleSubmit } = useFormik({
        initialValues: {
            firstName: person.firstName,
            secondName: person.secondName,
            phoneNumber: person.phoneNumber,
            city: address.city,
            country: address.country,
            flatNumber: address.flatNumber,
            houseNumber: address.houseNumber,
            street: address.street,
        },
        enableReinitialize: true,
        validationSchema: initialSchema,
        onSubmit,
    })


    const sendUser = () => {
        axios.put(`http://localhost:8080/api/users/edit/`, userRequest).then(response => {
        })
    }

    const getUser = () => {
        axios.get(`http://localhost:8080/api/users/user/${JSON.parse(localStorage.getItem('userInfo')).id}`).then(response => {
            setUser(response.data)
            setPerson(response.data?.person)
            setAddress(response.data?.person?.address)
        })
    }

    return (
        <>
            <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
                <form className='w-full max-w' onSubmit={handleSubmit} autoComplete='off'>
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
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Имя:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={values.firstName}
                            onChange={handleChange}
                            id='firstName'
                            type='text'
                            placeholder='Введите имя'
                        />
                        <div>
                            {errors?.firstName && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.firstName}
                            </div>}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Фамилия:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={values.secondName}
                            onChange={handleChange}
                            id='secondName'
                            type='text'
                            placeholder='Введите фамилию'
                        />
                        <div>
                            {errors?.secondName && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.secondName}
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
                            inputMode="numeric"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            id='phoneNumber'
                            type='tel'
                            placeholder='Введите номер телефона'
                        />
                        <div>
                            {errors?.phoneNumber && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.phoneNumber}
                            </div>}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Страна:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={values.country}
                            onChange={handleChange}
                            id='country'
                            type='text'
                            placeholder='Введите страну'
                        />
                        <div>
                            {errors?.country && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.country}
                            </div>}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Город:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={values.city}
                            onChange={handleChange}
                            id='city'
                            type='text'
                            placeholder='Введите город'
                        />
                        <div>
                            {errors?.city && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.city}
                            </div>}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Улица:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={values.street}
                            onChange={handleChange}
                            id='street'
                            type='text'
                            placeholder='Введите улицу или проспект'
                        />
                        <div>
                            {errors?.street && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.street}
                            </div>}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Номер квартиры:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={values.flatNumber}
                            onChange={handleChange}
                            id='flatNumber'
                            type='number'
                            placeholder='Введите номер квартиры'
                        />
                        <div>
                            {errors?.flatNumber && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.flatNumber}
                            </div>}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Номер дома:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={values.houseNumber}
                            onChange={handleChange}
                            id='houseNumber'
                            type='number'
                            placeholder='Введите номер дома'
                        />
                        <div>
                            {errors?.houseNumber && <div className="p-2 mt-2 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                                {errors?.houseNumber}
                            </div>}
                        </div>
                    </div>
                    <div className="w-full md:w-1/1 px-3">
                        <div class="inline-flex">
                            <button type='submit' class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </form >
            </div >
        </>
    )
}
