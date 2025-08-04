import React from 'react'
import { testimonialsData } from '../assets/assets'; 
import { motion } from 'framer-motion';

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
            type: 'tween'
        }
    })
};

function Testimonials() {
    return (
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white" id="testimonials">
            <div className="max-w-5xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">What Our Users Say</h2>
                <p className="text-center text-gray-500 mb-12">Real feedback from our happy customers</p>
                <div className="grid gap-8 md:grid-cols-3 ">
                    {testimonialsData.map((testimonial, index) => (
                        <motion.div
                            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow hover:border-1 hover:border-blue-200"
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name}
                                className="w-20 h-20 rounded-full border-4 border-indigo-100 mb-4 object-cover"
                            />
                            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                            <span className="text-indigo-500 text-sm mb-2">{testimonial.role}</span>
                            <div className="flex justify-center mb-3">
                                {Array.from({ length: testimonial.stars }, (_, i) => (
                                    <span key={i} className="text-yellow-400 text-xl">★</span>
                                ))}
                            </div>
                            <p className="text-gray-600 italic">"{testimonial.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
