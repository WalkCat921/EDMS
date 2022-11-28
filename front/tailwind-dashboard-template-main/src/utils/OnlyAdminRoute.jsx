import React from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useLocalState } from './useLocalStorage'

export default function OnlyAdminRoute({children}) {
    const [userInfo, setUserInfo] = useLocalState("","userInfo")
  return (
    userInfo.roles?.map(role => role === 'ROLE_ADMIN' ? children:<Navigate to="/main"/>)
  )
}

