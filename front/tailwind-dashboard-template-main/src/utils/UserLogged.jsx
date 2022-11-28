import React from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useLocalState } from './useLocalStorage'

export default function UserLogged({children}) {
    const [userInfo, setUserInfo] = useLocalState("","userInfo")
  return (
    userInfo.token ? <Navigate to="/main"/>:children
  )
}

