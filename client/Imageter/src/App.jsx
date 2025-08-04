//Make the whole project styling through copilot and make it whitish and asthetic minimalistic
import React from 'react'
import Home from './pages/Home'
import Result from './pages/Result'
import ByCredit from './pages/ByCredit'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AppContext } from './context/AppContext';

function App() {
  const {showLogin} = React.useContext(AppContext);
  return (
    <div className='h-screen w-full flex flex-col justify-start items-center bg-white  text-gray-800'>
      <ToastContainer position='bottom-right'/>
      <Navbar />
      {showLogin && <Login />}
      <div className='w-full max-w-4xl p-4'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<ByCredit/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <Footer />
      
    </div>
  </div>
  )
}

export default App