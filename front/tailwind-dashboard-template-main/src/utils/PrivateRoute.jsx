import React from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useLocalState } from './useLocalStorage'

export default function PrivateRoute({children}) {
    const [userInfo, setUserInfo] = useLocalState("","userInfo")
  return (
    userInfo.token ? children:<Navigate to="/"/>
  )
}

