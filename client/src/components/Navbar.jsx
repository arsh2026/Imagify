import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
// Assuming this is a function to update login state

const Navbar = () => {
    const {user,setShowLogin ,logout, credit}=useContext(AppContext); // Accessing user state from AppContext

    const navigate = useNavigate();
    // Simulating user state, in a real application this would come from authentication context or state management
  return (
    <div className='flex justify-between items-center py-4'>
      <Link to='/'>
      <img src={assets.logo} alt="" className='w=28 sm:w-32 lg:w-40 '/>
      </Link>

      <div>
        {
        user ? 
        <div className='flex items-center gap-2 sm:gap-3'>
            <button onClick={()=>navigate('/buy')} className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'> 
                <img className='w-5' src={assets.credit_star} alt="" />
                <p className='text-xs sm:text-sm font-medium text-gray-600'>Credits left: {credit}</p>
            </button>
            <p className='text-m text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
            <div className='relative group'>
                <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                    <ul className='list-none m-0 p-2 bg-white rounded-full border text-sm '>
                        <li onClick={logout} className=' py-1 px-2 cursor-pointer pr-10'>Logout</li>
                    </ul>

                </div>
            </div>
        </div> // User is logged in, show user info or logout button
        :
        <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={()=>navigate('/buy')} className='cursor-pointer'>Pricing</p>
            <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:py-2 sm:px-10 text-sm rounded-full'>Login</button>
        </div> // User is not logged in, show login or signup button
        }
        
        
      </div>


    </div>
  )
}

export default Navbar
