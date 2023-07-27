import axios from "axios"

import { usersigninfail, usersigninreq, usersinginsucc } from "./ActionTypes"


export const usersigninrequest=()=>{
    return {type:usersigninreq}
}
export const usersignsuccess=(payload)=>{
    return {type:usersinginsucc,payload}
}
export const usersigninfailure=()=>{
    return {type:usersigninfail}
}

// console.log(process.env.REACT_APP_MY_URL)
export const usersignin=(obj)=>(dispatch)=>{
    dispatch(usersigninrequest())
    return axios.post(`${process.env.REACT_APP_MY_URL}/user/login`,obj)
}