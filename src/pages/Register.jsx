import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import { TitleText } from '../components/Text'
import Footer from '../components/Footer'

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';

axios.defaults.withCredentials = true
const Register = () => {

  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [username, setUsername] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)
  const inputRef = useRef()
  // to focus in the email input in the first render
    useEffect(() => {
      inputRef.current.focus()
    }, [])
    const handleRegister = async(e) => {
      setLoading(true)
      e.preventDefault()
      try {
        const res = await axios.post(`http://localhost:5000/api/register`, {
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword
        })
        setSuccess(true)
        toast.info('Registered Success!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
        setTimeout(() => {
          nav("/login")
        }, 5000);
        setLoading(false)
      } catch (error) {
        setError(error.response.data)
        setLoading(false)
      }
  }

  return (
    <div>
        <Nav />
        <div className=' mt-20' />
        <div className='flex justify-center items-center h-screen'>
        <div className='w-full max-w-xl p-10'>
               <TitleText  textStyles='uppercase font-jost font-semibold leading-[5vw] text-[#011936] my-4 text-center text-[5vw] cursor-pointer tracking-tighter' title="Sign up to WAVE" />
              <form className='flex flex-col space-y-4' onSubmit={(e) => handleRegister(e)}>
              <div className='flex-1 space-y-2'>
                  <label className='text-[15px] text-[#011936] font-poppins font-semibold'>Username:</label>
                  <input ref={inputRef} required onChange={(e) => setUsername(e.target.value)} value={username} type="name"  placeholder='Your username here'  className='block w-full rounded-md border border-gray-200 bg-white py-4 pl-4 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#011936] focus:outline-none focus:ring-0' />
                </div>
                <div className='flex-1 space-y-2'>
                  <label className='text-[15px] text-[#011936] font-poppins font-semibold'>Email:</label>
                  <input required onChange={(e) => setEmail(e.target.value)} value={email} type="email"  placeholder='Your email here'  className='block w-full rounded-md border border-gray-200 bg-white py-4 pl-4 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#011936] focus:outline-none focus:ring-0' />
                </div>
                <div className='flex-1 space-y-2'>
                  <label className='text-[15px] text-[#011936] font-poppins font-semibold'>Password:</label>
                  <input required onChange={(e) => setPassword(e.target.value)} value={password} type="password"  placeholder='Your password here'  className='block w-full rounded-md border border-gray-200 bg-white py-4 pl-4 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#011936] focus:outline-none focus:ring-0' />
                </div>
                <div className='flex-1 space-y-2'>
                  <label className='text-[15px] text-[#011936] font-poppins font-semibold'>Confirm Password:</label>
                  <input required onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type='password'  placeholder='confirm password'  className='block w-full rounded-md border border-gray-200 bg-white py-4 pl-4 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#011936] focus:outline-none focus:ring-0' />
                </div>
                <button type='submit' disabled={loading} className="bg-[#011936] disabled:bg-[#011936] disabled:opacity-50 font-poppins hover:bg-[#011936] text-white font-semibold py-3 px-5 rounded">
                  Sign up
                </button>
              </form>
              {error.message && <h1 className='text-[15px] mb-4 rounded-xl border border-red-600 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4  text-center mt-3 font-satoshi font-semibold text-red-700'>Error : {error.message}</h1>}
              <h1 className='text-[15px] mt-3 font-poppins font-semibold'>Already have an account ? <span onClick={() => nav('/login')} className='text-[#011936] cursor-pointer hover:underline'>Login</span></h1>
          </div>
        </div>
        {success && <ToastContainer
          className="mt-20"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
        }
        <Footer />
    </div>
    
  )
}

export default Register