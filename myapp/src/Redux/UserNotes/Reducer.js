import { gettaskfail, gettaskreq, gettasksucc } from "./ActionTypes"


const initialdata={
    isLoading:false,
    isError:false,
    totalpages:0,
    usernotes:[],
    length:0
}

export const reducer=(state=initialdata,action)=>{
    const {type,payload}=action
    switch(type){
        case gettaskreq:{
            return {...state,isLoading:true,isError:false,usernotes:[],totalpages:0,length:0}
        }
        case gettasksucc:{
            // console.log(payload)
            return {...state,isLoading:false,isError:false,usernotes:payload.data,totalpages:payload.totalpages,length:payload.length}
        }
        case gettaskfail:{
            return {...state,isLoading:false,isError:true,usernotes:[],totalpages:0,length:0}
        }
        default:{
            return state
        }
    }
}