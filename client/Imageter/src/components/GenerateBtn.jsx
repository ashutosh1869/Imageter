import React from 'react'
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

function GenerateBtn() {
    const Navigate = useNavigate();
    const { user, setShowLogin } = React.useContext(AppContext);

    return (
        <motion.div
            className='flex flex-col w-full gap-6 items-center justify-center bg-white p-6 mb-10 text-center'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.p
                className='flex gap-2'
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <span className='text-2xl font-semibold'>See the magic happen!</span>
                <motion.img
                    src={assets.star_icon}
                    alt=""
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                />
            </motion.p>

            <motion.div
                className='flex bg-blue-600 py-2 px-20 justify-center rounded-lg gap-4'
                whileHover={{ scale: 1.05, boxShadow: "0px 4px 20px rgba(59,130,246,0.2)" }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                <button
                    className='text-white text-2xl cursor-pointer transition-colors duration-300 rounded-lg px-4 py-2'
                    onClick={() => user ? Navigate('/result') : setShowLogin(true)}
                >
                    {user ? 'Generate Images' : 'Get Started'}
                </button>
                <motion.img
                    src={assets.star_group}
                    alt="AI Icon"
                    className='h-6 w-6'
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                />
            </motion.div>
        </motion.div>
    )
}

export default GenerateBtn