import axios from "axios"
import { deletetaskfail, deletetaskreq, deletetasksucc } from "./ActionTypes"

export const deletetaskrequest=()=>{
    return {type:deletetaskreq}
}
export const deletetasksuccess=()=>{
    return {type:deletetasksucc}
}
export const deletetaskfailure=()=>{
    return {type:deletetaskfail}
}
export const deletetask=(id)=>(dispatch)=>{
    dispatch(deletetaskrequest())
    let token=sessionStorage.getItem("token")
    return axios.delete(`${process.env.REACT_APP_MY_URL}/userpost/deletedata/${id}`,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
}