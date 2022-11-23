import { Button, Input, Tooltip } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import EditMenu from '../EditMenu';
import { toJSON, fromJSON } from 'flatted';

export default function UserForm() {

    const [address,setAddress]=useState({
        country:'',
        city:'',
        street:'',
        flatNumber:'',
        houseNumber:''
    })
    const [person, setPerson] = useState({
        firstName:'',
        secondName:'',
        phoneNumber:'',
        address:address
    })
    const [user, setUser] = useState({
        username: '',
        email: '',
        person:person
    })
    const [isApplyButtonAvaible, setIsApplyButtonAvaible] = useState(false);
    const [isFieldAvaible, setIsFieldAvaible] = useState(false);
    const [isEditButtonPressed, setIsEditButtonPressed] = useState(false);



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
        setPerson({...person, [e.target.name]:e.target.value})
        user.person=person
    }

    const onAddressInput = (e) => {
        setAddress({...address, [e.target.name]:e.target.value})
        user.person.address=address
    }

    const handleApplyButton = () => {
        setIsFieldAvaible(!isFieldAvaible)
        setIsApplyButtonAvaible(false)
        personData(user)
        console.log(user)
    }

    const getUser = async () => {
        // const userResponseData = await axios.get(`http://localhost:8080/api/users/user/current`);
        const userResponseData = await axios.get(`http://localhost:8080/api/users/user/${JSON.parse(localStorage.getItem('userInfo')).id}`)
        setUser(userResponseData.data)
        setPerson(userResponseData.data.person)
        setAddress(userResponseData.data.person.address)
        // alert(JSON.stringify(user))
    }

    const personData = (userData) => {
        axios.put(`http://localhost:8080/api/users/edit/${userData.id}`,userData).then(response=>{
            alert(response.data)
            localStorage.setItem('userInfo',JSON.stringify(response.data));
            location.reload()
        })
    }

    // const 

    return (<>
        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-slate-200">
            <form className="w-full max-w ">
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 justify-center text-center">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Личный номер:{user.id}
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="hidden" value={user.id} placeholder="Имя пользователя" />
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Имя пользователя:
                        </label>
                        <input
                            onChange={(e) => onUserInput(e)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            disabled={!isFieldAvaible}
                            type="text"
                            name='username'
                            value={user.username}
                            placeholder="Имя пользователя" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Email:
                        </label>
                        <input
                            name='email'
                            onChange={(e) => onUserInput(e)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            disabled={!isFieldAvaible}
                            type="text"
                            value={user.email}
                            placeholder="Email" />
                    </div>
                </div>
            {/* </form> */}
        {/* </div> */}
        {/* <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200"> */}
            {/* <form className="w-full max-w"> */}
                <div className="flex flex-wrap mb-6 justify-center text-center">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            <div className='inline-flex mt-6'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 2 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>
                                <p className='ml-3'>Личные данные</p>
                            </div>
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="hidden" value={user.id} placeholder="Имя пользователя" />
                    </div>
                </div>
                <div className="flex flex-wrap mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                            Фамилия:
                        </label>
                        <input
                            onChange={(e) => onPersonInput(e)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            disabled={!isFieldAvaible}
                            value={person.secondName}
                            type="text"
                            name='secondName'
                            placeholder="Фамилия" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Имя:
                        </label>
                        <input
                            onChange={(e) => onPersonInput(e)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            disabled={!isFieldAvaible}
                            value={person.firstName}
                            type="text"
                            name='firstName'
                            placeholder="Имя" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Телефон:
                        </label>
                        <input
                            onChange={(e) => onPersonInput(e)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            disabled={!isFieldAvaible}
                            value={person.phoneNumber}
                            type="tel"
                            name='phoneNumber'
                            placeholder="Телефон" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Страна:
                        </label>
                        <input
                            value={address.country}
                            onChange={(e) => onAddressInput(e)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            disabled={!isFieldAvaible}
                            type="text"
                            name='country'
                            placeholder="Страна" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Город:
                        </label>
                        <input
                        value={address.city}
                            onChange={(e) => onAddressInput(e)}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            disabled={!isFieldAvaible}
                            type="text"
                            name='city'
                            placeholder="Город" />
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Улица:
                        </label>
                        <input 
                        onChange={(e) => onAddressInput(e)} 
                        value={address.street}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        disabled={!isFieldAvaible} 
                        type="text" 
                        name='street' 
                        placeholder="Улица/Проспект"/>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Номер дома:
                        </label>
                        <input 
                        onChange={(e) => onAddressInput(e)} 
                        value={address.houseNumber}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        disabled={!isFieldAvaible} 
                        type="number" 
                        name='houseNumber' 
                        placeholder="Номер дома"/>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                            Номер квартиры:
                        </label>
                        <input 
                        onChange={(e) => onAddressInput(e)} 
                        value={address.flatNumber}
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                        disabled={!isFieldAvaible} 
                        type="number" 
                        name='flatNumber' 
                        placeholder="Номер квартиры"/>
                    </div>
                    <div className="w-full md:w-1/1 px-3">
                        <div class="inline-flex">
                            <Tooltip title='Редактировать'>
                                <Button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 mr-4" onClick={(e) => handleEditButton(e)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </Button>

                            </Tooltip>
                            {isApplyButtonAvaible && <Tooltip title='Принять'>
                                <Button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mt-4 mr-4" onClick={() => handleApplyButton()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </Button>
                            </Tooltip>}
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border">
            <table className="table-auto w-full">
                <thead>
                    <tr >
                        <th colSpan={6} className='p-4 border-b-2'>Мои документы</th>
                    </tr>
                    <tr>
                        <th className='border-r-2 border-b-2 p-3'>Тип</th>
                        <th className='border-r-2 border-b-2'>Название</th>
                        <th className='border-r-2 border-b-2'>Дата загрузки</th>
                        <th className='border-r-2 border-b-2'>Размер</th>
                        <th className='border-r-2 border-b-2'>Автор</th>
                        <th className='border-b-2'>Функции</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='border-t-2 text-center'>
                        <td className='p-6'>PDF</td>
                        <td>Test PDF File</td>
                        <td>19.11.2022</td>
                        <td>200 KB</td>
                        <td>Egor</td>
                        <td className='text-center'><EditMenu className="relative inline-flex">
                            <li>
                                <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Открыть</Link>
                            </li>
                            <li>
                                <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Скачать</Link>
                            </li>
                            <li>
                                <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Изменить</Link>
                            </li>
                            <li>
                                <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Удалить</Link>
                            </li>
                        </EditMenu></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
    )
}
