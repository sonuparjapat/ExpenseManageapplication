import { usersigninfail, usersigninreq, usersinginsucc } from "./ActionTypes"


const initialdata={
    isLoading:false,
    isError:false,
   usertoken:"",
 
   "useremail":"",
 
}

export const reducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case usersigninreq:{
            return {...state,isLoading:true,isError:false,usertoken:"",useremail:""}
        }
        case usersinginsucc:{
// console.log(payload)
            return {...state,isLoading:false,isError:false,usertoken:payload.token,useremail:payload.useremail}
        }
        case usersigninfail:{
            return {...state,isLoading:false,isError:true,usertoken:'',useremail:""}
        }
        default:{
            return state
        }
    }
}