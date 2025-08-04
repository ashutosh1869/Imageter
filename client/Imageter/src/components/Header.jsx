import React from 'react'
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';


function Header() {
    const Navigate = useNavigate();
    const { user, setShowLogin } = useContext(AppContext);

    return (
        <motion.div
            className='flex flex-col items-center gap-10 justify-center bg-white my-20 rounded-lg p-4 text-center'
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: .8, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
        >
            <div className='flex items-center gap-2 text-stone-50 border-2 border-gray-200 rounded-full p-2 px-20 bg-gray-100'>
                <img src={assets.star_icon} alt="icon" />
                <p className='text-black font-bold'>Welcome to Imageter</p>
            </div>
            <motion.h1
                className='text-black max-w-[300px] font-bold text-4xl sm:text-7xl sm:max-w-[600px]'
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
            >
                Your imagination,<span className='text-blue-600'> our creation</span>
            </motion.h1>
            <p className='text-gray-600 mt-0'>Create stunning images with ease</p>
            <div className='flex bg-blue-600 py-2 px-6 rounded-lg gap-4'>
                <button className=' text-white text-2xl cursor-pointer' onClick={() => user ? Navigate('/result') : setShowLogin(true)}>{user ? 'Generate Images' : 'Get Started'}</button>
                <img src={assets.star_group} alt="AI Icon" className='h-6 w-6' />
            </div>
            <div className='flex gap-4'>
                {Array(5).fill('').map((_, index) => (
                    <motion.img
                        key={index}
                        src={assets.sample_img_1}
                        alt="Credit Star"
                        className='h-20 w-20 inline-block rounded cursor-pointer hover:scale-105 transition-transform duration-200'
                        whileHover={{ scale: 1.08 }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default Header