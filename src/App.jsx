import { useState } from 'react'

import './App.css'
import  { Header } from './common/Header/Header'
import { Body } from './pages/Body/Body'



export const App= ()=> {
  
  return (
    <>
     <Header/>
      <Body />
    </>
  )
}

export default App


