import React from 'react'
import Navbar from '../Components/Navbar'
import { Routes,Route } from 'react-router-dom'
import Login from '../ALLPages/Login'
import Signup from '../ALLPages/Signup'
import ViewExpenses from '../ALLPages/Data'
import Filter from '../ALLPages/Filter'
import PrivateRoute from './PrivateRoute'
export default function AllRoutes() {
  return (
    <div>
       <Navbar/>
       <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/expenses" element={<PrivateRoute><Filter/></PrivateRoute>}></Route>
        <Route path="/" element={<Login/>}></Route>
       </Routes>


    </div>
  )
}
