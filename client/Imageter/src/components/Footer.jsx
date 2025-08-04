import React from 'react'
import { assets } from '../assets/assets'; // Adjust the path as needed

function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 w-full py-5 pb-2">
            <div className="container mx-auto w-full px-4">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    {/* Copyright Section */}
                    <div className="text-center md:text-left">
                        <p className="text-gray-600 text-sm font-medium">
                            &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-500">Imageter</span>. All rights reserved.
                        </p>
                    </div>
                    
                    {/* Social Media Section */}
                    <div className="flex items-center space-x-6">
                        <span className="text-gray-500 text-sm font-medium hidden sm:block">
                            Follow us on
                        </span>
                        <div className="flex items-center space-x-3">
                            <a 
                                href="mailto:contact@imageter.com" 
                                className="group relative p-2 rounded-full bg-gray-50 hover:bg-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Email us"
                            >
                                <img 
                                    src={assets.email_icon} 
                                    alt="Email" 
                                    className="w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert" 
                                />
                            </a>
                            
                            <a 
                                href="https://facebook.com" 
                                className="group relative p-2 rounded-full bg-gray-50 hover:bg-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Follow us on Facebook"
                            >
                                <img 
                                    src={assets.facebook_icon} 
                                    alt="Facebook" 
                                    className="w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert" 
                                />
                            </a>
                            
                            <a 
                                href="https://instagram.com" 
                                className="group relative p-2 rounded-full bg-gray-50 hover:bg-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                                target="_blank" 
                                rel="noopener noreferrer"
                                aria-label="Follow us on Instagram"
                            >
                                <img 
                                    src={assets.instagram_icon} 
                                    alt="Instagram" 
                                    className="w-5 h-5 transition-all duration-300 group-hover:brightness-0 group-hover:invert" 
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer