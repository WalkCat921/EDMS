import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import InputMask from "react-input-mask";

export default function LoginUser() {

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

    let navigate = useNavigate()

    const [user, setUser] = useState({
        password: "",
        username: ""
    })

    const {password, username} = user

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const onSubmit = async (e) => {
        // e.preventDefault();
        await axios.post(`http://localhost:8080/api/auth/signin`, user)
        .then(response=>{
            let token = response.data.token;
            localStorage.setItem('jwtToken',token);
        })
        navigate("/")
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-10 offset-md-1 border rounded p-4 mt-2 shadow'>
                    {/*
                    TODO: clear on release, create phone not requierd by checkbox
                    Username:{username}
                    <br />
                    pass:{password}
                    <br />
                    email:{email}
                    <br />
                    phone:{phoneNumber}
                    <br />
                    confirmPassword:{confirmPassword} */}
                    <h3 className='text-center'>Вход</h3>
                    {/* <form onSubmit={(e)=>onSubmit(e)} className="text-start"> */}
                    <form onSubmit={handleSubmit(onSubmit)} className="text-start">
                        <div className='mb-3'>
                            <label htmlFor="Username" className="form-label">
                                Имя пользователя <label className='text-danger'>*</label>
                            </label>
                            <input
                                {...register('username', {
                                    required: "Обязательное поле",

                                })}
                                type={"text"}
                                className="form-control"
                                placeholder='Введите имя пользователя'
                                name='username'
                                value={username}
                                onChange={(e) => onInputChange(e)} />
                            <div>
                                {errors?.username && <div class="alert alert-danger mt-1" role="alert">
                                    {errors?.username?.message}
                                </div>}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="Password" className="form-label">
                                Пароль <label className='text-danger'>*</label>
                            </label>
                            <input
                                {...register('password', {
                                    required: "Обязательное поле",

                                })}
                                type={"password"}
                                className="form-control"
                                placeholder='Введите пароль'
                                name='password'
                                value={password}
                                onChange={(e) => onInputChange(e)} />
                            <div>
                                {errors?.password && <div class="alert alert-danger mt-2 justify-content" role="alert">
                                    {errors?.password?.message}
                                </div>}
                            </div>
                        </div>
                        <button type='submit' className='btn btn-outline-primary' disabled={!isValid}>Принять</button>
                        <Link className='btn btn-outline-danger mx-2' to="/registration">Зарегестрироваться</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
