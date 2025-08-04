import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'

function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white text-gray-800">
      <Header />
      <Steps />
      <Testimonials />
      <GenerateBtn />
    </div>
  )
}

export default Home