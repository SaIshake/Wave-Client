import React, { useState, useRef, useEffect } from 'react'
import Nav from '../components/Nav'
import { TitleText } from '../components/Text'
import Footer from '../components/Footer'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Loading, loginFailed, loginSuccess } from '../redux/user'
import { useNavigate } from 'react-router-dom'

axios.defaults.withCredentials = true
const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const nav = useNavigate()
  const {loading} = useSelector(state => state.user)
  const [error, setError] = useState({})
  const inputRef = useRef(null)
  

  // to focus in the email input in the first render
  useEffect(() => {
    inputRef.current.focus()
  }, [])


  

  const handleLogin = async(e) => {
      
      e.preventDefault()
      dispatch(Loading())
      try {
        const res = await axios.post(`http://localhost:5000/api/login`, {
          email: email,
          password: password
        })
        if(res.data.details.isVerified) {
          nav("/")
        } else {
          window.location.href = "/verification"
        }
        dispatch(loginSuccess(res.data.details))
      } catch (error) {
        console.log(error.response.data)
        dispatch(loginFailed(error.response.data))
        setError(error.response.data)
      }
  }




  

  

  return (
    <div>
        <Nav />
        <div className='mt-8' />
        <div className='flex justify-center items-center h-screen'>
        <div className='w-full max-w-xl p-10'>
               <TitleText  textStyles='uppercase cursor-pointer font-jost font-semibold leading-[5vw] text-[#011936] my-4 text-center text-[5vw] tracking-tighter' title="Login to WAVE" />
              <form className='flex flex-col space-y-4' onSubmit={(e) => handleLogin(e)}>
                <div className='flex-1 space-y-2'>
                  <label className='text-[15px] text-[#011936] font-poppins font-semibold'>Email:</label>
                  <input ref={inputRef} required onChange={(e) => setEmail(e.target.value)} value={email} type="email"  placeholder='Your email here'  className='block w-full rounded-md border border-gray-200 bg-white py-4 pl-4 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#011936] focus:outline-none focus:ring-0' />
                </div>
                <div className='flex-1 space-y-2'>
                  <label className='text-[15px] text-[#011936] font-poppins font-semibold'>Password:</label>
                  <input  required onChange={(e) => setPassword(e.target.value)} value={password} type='password'  placeholder='Your password here'  className='block w-full rounded-md border border-gray-200 bg-white py-4 pl-4 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#011936] focus:outline-none focus:ring-0' />
                </div>
                <button disabled={loading} type='submit' className="bg-[#011936] font-poppins hover:bg-[#011936] disabled:bg-[#011936] disabled:opacity-50 text-white font-semibold py-3 px-5 rounded">
                  Login
                </button>
              </form>
              {error.message && <h1 className='text-[15px] mb-4 rounded-xl border border-red-600 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4  text-center mt-3 font-satoshi font-semibold text-red-700'>Error : {error.message}</h1>}
              <h1 className='text-[15px] mt-3 font-poppins font-semibold'>You don't have An Account ? <span onClick={() => nav('/register')} className='text-[#011936] cursor-pointer hover:underline'>Register</span></h1>
          </div>
        </div>
        <Footer />
    </div>
    
  )
}

export default Login