import React from 'react'
import "./Body.css"
import { Route,Routes } from 'react-router-dom'
import { Login } from '../Login/Login'
import { Home } from '../Home/Home'
import {Register} from '../Register/Register'
import { Profile } from '../Profile/Profile'
import { Appointment } from '../Appointment/Appointment'
import { NewAppointment } from '../NewAppointment/NewAppointment'
import { AdminProfiles } from '../AdminProfiles/AdminProfiles'
import { AdminCreatr } from '../AdminCreate/AdminCreatr'


export const Body = () => {
  return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/appointment' element={<Appointment/>}/>
            <Route path='/newAppointment' element={<NewAppointment/>}/>
            <Route path='/adminProfile' element={<AdminProfiles/>}/>
            <Route path='/adminCreate' element={<AdminCreatr/>}/>
        </Routes>
    
  )
}
