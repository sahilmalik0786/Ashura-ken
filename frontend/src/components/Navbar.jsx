import React from 'react'
import Navigation from './Navigation'
import { useLocation } from 'react-router'


const Navbar = () => {
    const location = useLocation()
    const isDashboard = location.pathname.startsWith('/dashboard') 
    
  return (
    <div className='border-b'>
      
    <div className={`flex items-center max-w-4xl mx-auto justify-between p-2 border-r border-l ${isDashboard?'hidden':''}`}>
        <h1 className='rounded-lg  text-lg px-2 py-1'>Ashura Ken</h1>   
        <Navigation/>

    </div>
    </div>
  )
}

export default Navbar