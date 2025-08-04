//write all the classname using copilot and make sure you add sm md lg classes
import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';



function Navbar() {
    const { user,logout,credit, setShowLogin } = useContext(AppContext);
    console.log(user,"nav")
    const navigate = useNavigate();
    return (
        <div className='w-screen flex px-4 justify-between items-center bg-white shadow-md p-2'>
            <Link to='/' className='flex items-center gap-2'>
                <img src={assets.logo} alt="Logo" className='h-12 sm:h-14 md:h-16 lg:h-18' />
            </Link>

            <div className='flex justify-center items-center'>
                {user ?
                    <div className='flex gap-4 text-gray-600 sm:text-sm md:text-base lg:text-lg'>
                        <button className=' text-white bg-blue-300 flex gap-0.5 px-2 py-2 rounded-full cursor-pointer' onClick={() => navigate('/buy')}>
                            <img src={assets.credit_star} alt="" className='h-6 w-6' />
                            <p className='items-center'>Credits: {credit}</p>
                        </button>
                        <p className='px-2 py-2'>Hi, {user}</p>
                    
                        <div className='flex items-center group relative cursor-pointer'>
                            <img src={assets.profile_icon} alt="User" className='h-10 w-10 rounded-full' />
                            <div className='absolute  hidden group-hover:block bg-white shadow-md rounded-md p-2 top-10 right-0 z-10'>
                                
                                <ul className='flex flex-col gap-2'>
                                    <li className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md' onClick={logout}>
                                        <p className='text-gray-800'>Logout</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :<div className='flex px-4 gap-5 text-gray-600 sm:text-sm md:text-base lg:text-lg'>
                        <p className='cursor-pointer' onClick={() => navigate('/buy')}>Pricing</p>
                        <button className='bg-blue-500 text-white px-4 rounded cursor-pointer' onClick={() => setShowLogin(true)}>Login</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar