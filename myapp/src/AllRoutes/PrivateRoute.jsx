import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRoute({children}) {

const location=useLocation()
const data=useSelector((state)=>state.usersigninreducer)
const {usertoken}=data
// console.log(token)
if(!usertoken){
    return <Navigate to="/login" state={location.pathname} replace />
}
return children
}
