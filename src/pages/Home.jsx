import React, { useState } from 'react'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Nav from '../components/Nav'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSuccess } from '../redux/cartReducer'
import HeroTwo from '../components/HeroTwo'
import { logout } from '../redux/user'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"


const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setSuccess(false))
  }, [])
  const [isNotAuth, setIsNotAuth] = useState(false)
  const handleProtected = async() => {
    try {
      const res = await axios.post(`http://localhost:5000/api/protected`)
      console.log(res.data)
    } catch (error) {
      setIsNotAuth(true)
      toast.info('Your Session Is Expired Pleas Login Again!', {
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
        dispatch(logout())
        localStorage.clear()
      }, 7000);
    }
  }
  useEffect(() => {
    handleProtected()
  }, [])
  
  return (
    <div className='overflow-x-hidden'>
      {isNotAuth && <ToastContainer className="mt-10"
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
      <Nav />
      <Hero />
      <HeroTwo />
      <Footer />
    </div>
  )
}

export default Home