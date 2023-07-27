import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { usersignup } from '../Redux/UserSide/Authentication/Action'
import { usersignin, usersigninfailure, usersignsuccess } from '../Redux/UserSide/Authentication/UserLogin/Action'
import Alert from '../Components/Alert'
import { usersingtaskfail } from '../Redux/UserSingletask/ActionTypes'
const initialdata={
  "email":"",
  "password":""
}
export default function Login() {
  const [logindata,setLogindata]=useState(initialdata)
  const [alertdata,setAlertdata]=useState("")
const handlechange=(e)=>{
  const {name,value}=e.target
  setLogindata((pre)=>({...pre,[name]:value}))
} 
const dispatch=useDispatch()
const data=useSelector((state)=>state.usersigninreducer)
const {isLoading}=data
const handlesubmit=(e)=>{
  e.preventDefault()
dispatch(usersignin(logindata)).then((res)=>{
  // console.log(res)
  dispatch(usersignsuccess(res.data))
  sessionStorage.setItem("token",res.data.token)
setAlertdata(res.data.msg)
setTimeout(()=>{
  setAlertdata("")
},2000)
}).catch((err)=>{
  dispatch(usersigninfailure())
  console.log(err)
  setAlertdata(err.response.data.msg)

  setTimeout(()=>{
    setAlertdata("")
  },2000)
})
 
}
return (
      <>
      {alertdata&&<Alert message={alertdata}/>}
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handlesubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input

                  value={logindata.email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
onChange={handlechange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    value={logindata.password}
                    name="password"
                    type="password"
                    onChange={handlechange}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                {isLoading?
                
                <button
               
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
              Loading...
                </button>:
              
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              
              }
                
              </div>
            </form>
            <Link to="/signup"><p className='mt-2 text-center'>or signUp?</p></Link>
         
          </div>
        </div>
      </>
    )
  }