import { signupfail, signupreq, signupsucc } from "./ActionTypes"
import axios from "axios"


export const signuprequest=()=>{
    return {type:signupreq}
}
export const signupsucess=(payload)=>{
    return {type:signupsucc,payload}
}
export const signupfailure=()=>{
    return {type:signupfail}
}

const url=process.env.REACT_APP_MY_URL
// console.log(url)
export const usersignup=(obj)=>async(dispatch)=>{
    dispatch(signuprequest())

  return await axios.post(`${url}/user/register`,obj
//   {
//     headers:{
//         "Content-Type":"multipart/form-data"
//     }
//   }
  )


}