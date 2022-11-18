import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import InputMask from "react-input-mask";
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const options = ['Бизнес', 'Разработка', 'Сервис'];

export default function RegistrationUser() {


    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    })

    let navigate = useNavigate()

    const [confirmPassword, setConfirmPassword] = useState('')
    const [inputValue, setInputValue] = React.useState('');
    const [errorMessage, setErrorMessage] = useState(null)

    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
        department: ""
    })

    const { username, password, email, department } = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        try {
            await axios.post(`http://localhost:8080/api/auth/signup`, user)
            navigate("/")
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-10 offset-md-1 border rounded p-4 mt-2 shadow'>
                    <div>
                        {errorMessage && <><br /><Alert variant="outlined" severity="error">{errorMessage}</Alert></>}
                    </div>
                    <h3 className='text-center'>Регистрация</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="text-start">
                        <div className='mb-3'>
                            <label htmlFor="Username" className="form-label">
                                Имя пользователя <label className='text-danger'>*</label>
                            </label>
                            <input
                                {...register('username', {
                                    required: "Обязательное поле",
                                    minLength: {
                                        value: 3,
                                        message: "Имя пользователя должно содержать минимум 2 символа!"
                                    }


                                })}
                                type={"text"}
                                className="form-control"
                                placeholder='Введите имя пользователя'
                                name='username' value={username}
                                onChange={(e) => onInputChange(e)} />
                            <div>
                                {errors?.username && <><br /><Alert variant="outlined" severity="error">{errors?.username?.message}</Alert></>}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Password" className="form-label">
                                Пароль <label className='text-danger'>*</label>
                            </label>
                            <input
                                {...register('password', {
                                    required: "Обязательное поле",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{7,20}$/,
                                        message: "Длина пароля должна состовлять 7-20 символов. Содержать минимум один символ верхнего и нижнего регистра. Содержать минимум одну цифру"
                                    }

                                })}
                                type={"password"}
                                className="form-control"
                                placeholder='Введите пароль'
                                name='password'
                                value={password}
                                onChange={(e) => onInputChange(e)} />
                            <div>
                                {errors?.password && <><br /><Alert variant="outlined" severity="error">{errors?.password?.message}</Alert></>}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Password" className="form-label">
                                Повтор пароля <label className='text-danger'>*</label>
                            </label>
                            <input
                                {...register('confirmPassword', {
                                    required: "Обязательное поле",
                                    validate: value => value === password || "Пароли не совпадают!"

                                })}
                                type="password"
                                className="form-control"
                                placeholder='Повторите пароль'
                                name='confirmPassword'
                                value={confirmPassword}
                                onInput={e => setConfirmPassword(e.target.value)} />
                            <div>
                                {errors?.confirmPassword && <><br /><Alert variant="outlined" severity="error">{errors?.confirmPassword?.message}</Alert></>}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Email" className="form-label">
                                Email <label className='text-danger'>*</label>
                            </label>
                            <input
                                {...register('email', {
                                    required: "Обязательное поле",
                                    pattern: {
                                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Не соответствует образцу!"
                                    }

                                })}
                                type={"email"}
                                className="form-control"
                                placeholder='Введите email'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)} />
                            <small id="emailHelp" className="form-text text-muted">Например: examplle@mail.com</small>
                            <div>
                                {errors?.email && <><br /><Alert variant="outlined" severity="error">{errors?.email?.message}</Alert></>}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Department" className="form-label">
                                Должность <label className='text-danger'>*</label>
                            </label>
                            <div>
                                <Autocomplete
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                        setUser({ ...user, ['department']: newInputValue })
                                    }}
                                    id="controllable-states-demo"
                                    options={options}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params}/>}
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-outline-primary' disabled={!isValid}>Принять</button>
                        <Link className='btn btn-outline-danger mx-2' to="/">Есть аккаунт?</Link>
                    </form>
                </div>
            </div>
        </div>
    )


}


