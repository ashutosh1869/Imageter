import React, { useEffect } from 'react'
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function Login() {
  const [state, setState] = React.useState('Login');
  const {showLogin,setShowLogin} = useContext(AppContext);
  const navigate = useNavigate();
  const {setUser,setToken, backendUrl}=useContext(AppContext);

  console.log(setUser,setToken, backendUrl,"context")
  const [name,setName] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Login') {
        const res = await axios.post(backendUrl + '/api/user/login', { email, password });
        console.log(res);
        if (res.data.success) {
          setUser(res.data.user.name);
          setToken(res.data.token);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user.name));
          setShowLogin(false);
          console.log(showLogin);
        } else {
          toast.error(res.data.message);
        }
      } else {
        // Registration validation
        if (!name.trim() || !email.trim() || !password.trim()) {
          toast.error('Please fill all fields');
          return;
        }
        // Registration logic

       
        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        console.log(data);
        if (data.success) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));

          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || 'An error occurred. Please try again later.');
        console.error('Backend error:', error.response.data);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed  inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-xs ">
      <div className="bg-white/80 relative rounded-2xl shadow-2xl px-10 py-10 flex flex-col items-center w-full max-w-md">

        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition p-4 cursor-pointer"
          onClick={() => setShowLogin(false)}
          aria-label="Close"
        >
          <img src={assets.cross_icon} alt="" />
        </button>
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">{state==='Login' ? 'Welcome Back' : 'Welcome'}</h1>
        <p className="text-gray-500 mb-8 text-center">{state==='Login' ? 'Please sign in to your account' : 'Please create an account'}</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          {state!=='Login' &&
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            />}

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-lg font-semibold shadow-md hover:from-blue-500 hover:to-purple-500 transition"
          >
            {state}
          </button>
        </form>
        {state === 'Login' &&
          <div className="mt-6 w-full flex flex-col items-center gap-2">
            
            <p className="text-gray-600">
              Forgot your password?{' '}
              <a href="/reset-password" className="text-blue-500 hover:underline font-medium">
                Reset Password
              </a>
            </p>
          </div>
        }
        {state === 'Login' ?
          <div className="mt-6 w-full flex flex-col items-center gap-2">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <span className="text-blue-500 hover:underline font-medium cursor-pointer" onClick={() => setState('register')}>
                Register
              </span>
            </p>
          </div>
          :
          <div className="mt-6 w-full flex flex-col items-center gap-2">
            <p className="text-gray-600">
              Already have an account?{' '}
              <span className="text-blue-500 hover:underline font-medium cursor-pointer" onClick={() => setState('Login')}>
                Login
              </span>
            </p>
          </div>  
      }
      </div>


    </div>
  )
}

export default Login
