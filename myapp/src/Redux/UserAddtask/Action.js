import axios from "axios"
import { useraddtaskfail, useraddtaskreq, useraddtasksucc } from "./ActionTypes"

export const useraddtaskrequest=()=>{
    return {type:useraddtaskreq}
}
export const useraddtasksuccess=()=>{
    return {type:useraddtasksucc}
}
export const useraddtaskfailure=()=>{
    return {type:useraddtaskfail}
}

export const useraddtask=(obj)=>(dispatch)=>{
    dispatch(useraddtaskrequest())
    const token = sessionStorage.getItem("token")

    return axios.post(`${process.env.REACT_APP_MY_URL}/userpost/postdata`,obj,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
}