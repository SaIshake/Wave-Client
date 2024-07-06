import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { TitleText } from '../components/Text'
import Footer from '../components/Footer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { verifyUser } from '../redux/user'

axios.defaults.withCredentials = true
const Verification = () => {

    const [otp, setOtp] = useState()
    const {user} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

  
    const handleVerify = async(e) => {
      setLoading(true)
      e.preventDefault()
      try {
        const res = await axios.post(`http://localhost:5000/api/verify/${user._id}`, {
          otp: otp
        })
        dispatch(verifyUser())
        setLoading(false)
        navigate("/")
      } catch (error) {
        setLoading(false)
        console.log(error)
        setError(error.response.data.error)
      }
    }
    const handleResend = async(e) => {
      e.preventDefault()
      try {
        const res = await axios.post(`http://localhost:5000/api/resend`, {
          email: user.email
        })
      } catch (error) {
      }
    }

  return (
    <div>
        <Nav />
        <div className='flex justify-center items-center h-screen mt-3'>
        <div className='w-full max-w-xl p-10'>
               <TitleText  textStyles='uppercase font-poppins font-semibold leading-[5vw] text-[#011936] my-4 text-center text-[5vw] cursor-pointer tracking-tighter' title="Verification Your Email" />
               <div className='w-full mt-28 max-w-xl m-10'>
              {error && <h1 className='text-[15px] mb-4 rounded-xl border border-red-600 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4  text-center mt-3 font-satoshi font-semibold text-red-700'>Error : {error}</h1>}

              <form className='flex flex-col space-y-4' onSubmit={(e) => handleVerify(e)}>
                <div className='flex-1 space-y-2'>
                  <label className='text-[20px] font-satoshi font-semibold'>OTP:</label>
                  <input onChange={(e) => setOtp(e.target.value)} value={otp || ""} required  type="number"  placeholder='OTP'  className='block w-full rounded-md border border-gray-200 bg-white py-4 pl-4 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-[#011936] focus:outline-none focus:ring-0' />
                </div>
                <button type='submit' className="bg-[#011936] disabled:bg-[#011936] disabled:opacity-50 font-poppins hover:bg-[#011936] text-white font-semibold py-3 px-5 rounded">
                  Verify
                </button>
              </form>
              <h1 className='text-[15px] mt-3 font-poppins font-semibold'>You don't recive OTP ? <span onClick={(e) => handleResend(e)} className='text-[#011936] cursor-pointer hover:underline'>resend</span></h1>
          </div>
        </div>
        </div>
        <Footer />
    </div>
    
  )
}

export default Verification