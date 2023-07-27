import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersignup } from '../Redux/UserSide/Authentication/Action'
import Alert from '../Components/Alert'
const initialdata={
  "email":"",
  "password":""
}
export default function Signup() {
  const [alertdata,setAlertdata]=useState("")
 const [signindata,setSignindata]=useState(initialdata)
const navigate=useNavigate()
 const handlechange=(e)=>{
  const {name,value}=e.target
  setSignindata((pre)=>({...pre,[name]:value}))
 }
 const dispatch=useDispatch()
 const data=useSelector((state)=>state.usersignupreducer)
 const {isLoading}=data
 const handlesubmit=(e)=>{
  e.preventDefault()
dispatch(usersignup(signindata)).then(async(res)=>{
 
  setAlertdata(res.data.msg)
 navigate("/login")
  setTimeout(()=>{
setAlertdata("")
  },3000)
}).catch((err)=>{
  console.log(err)
})
 }

return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        {alertdata&&<Alert message={alertdata}/>}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up to your account
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
                    id="email"
                    name="email"
                    onChange={handlechange}
                    value={signindata.email}
                    type="email"
                    autoComplete="email"
                    required
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
                    name="password"
                    onChange={handlechange}
                    value={signindata.password}
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                 sign up
                </button>
              </div>
            </form>
<Link to="/login
onChange={handlechange}
value={signindata.email}"><p className='mt-2 text-center'>or signIN?</p></Link>
         
          </div>
        </div>
      </>
    )
  }