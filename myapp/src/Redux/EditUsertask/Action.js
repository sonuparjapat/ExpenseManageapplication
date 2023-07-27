import { useredittaskfail, useredittaskreq, useredittasksucc } from "./ActionTypes"

import axios from "axios"
export const useredittaskrequest=()=>{
    return {type:useredittaskreq}
}
export const useredittasksuccess=()=>{
    return {type:useredittasksucc}
}

export const useredittaskfailure=()=>{
    return {type:useredittaskfail}
}

export const useredittask=(id,obj)=>async(dispatch)=>{
    dispatch(useredittaskrequest())
    const token=sessionStorage.getItem("token")
   return await axios.patch(`${process.env.REACT_APP_MY_URL}/userpost/updatedata/${id}`,obj,{
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
}