import React from 'react';
import { stepsData } from '../assets/assets';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, type: 'spring', stiffness: 60 }
    }),
};

const arrowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
        opacity: 1,
        x: 0,
        transition: { delay: i * 0.15 + 0.1, type: 'tween', duration: 0.4 }
    }),
};

function Steps() {
    return (
        <div className="flex flex-col items-center justify-center my-20">
            <h2 className="text-5xl font-extrabold mb-4 text-center">How it works</h2>
            <p className="text-xl text-gray-700 mb-2 text-center">Follow these simple steps to transform your images.</p>
            <p className="text-xl text-gray-700 mb-10 text-center">It's quick, easy, and fun!</p>
            <div className="flex flex-row gap-10 w-full max-w-5xl items-center justify-center">
                {stepsData.map((step, idx) => (
                    <React.Fragment key={step.title}>
                        <motion.div
                            className="bg-white shadow-2xl rounded-2xl p-10 flex flex-col items-center min-w-[260px] border-2 border-transparent hover:border-blue-500 transition-all duration-200"
                            custom={idx}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={cardVariants}
                        >
                            <div className="bg-blue-100 rounded-full p-4 mb-4 flex items-center justify-center">
                                <img src={step.icon} alt={step.title} className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-center">{step.title}</h3>
                            <p className="text-lg text-gray-600 text-center">{step.description}</p>
                        </motion.div>
                        {idx < stepsData.length - 1 && (
                            <motion.div
                                className="flex items-center"
                                custom={idx}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={arrowVariants}
                            >
                                <FaArrowRight className="w-12 h-12 text-blue-500" />
                            </motion.div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default Steps;
