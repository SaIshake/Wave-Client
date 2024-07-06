import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { TypingText } from '../components/Text'
import runFireworks from '../utils/success';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSuccess } from '../redux/cartReducer';



const Success = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const success = useSelector((state) => state.cart.success);
    useEffect(() => {
        success && runFireworks()
        !success && navigate("/")
      }, []);
    /*
    if (!success) {
        return (
          <Home /> // You can replace this with a loading component or message
        );
    }
    */
  return (
<div>
        <Nav />
        <div className='flex justify-center items-center h-screen'>
      <div className=' w-[60%] md:mb-7 mb-2 rounded-md flex flex-col items-center'>
        <p className='md:text-[20px] text-[30px] text-center font-poppins font-medium'>Bienvenue à nouveau sur notre site! Nous sommes ravis de vous revoir. Ici, vous trouverez de plus en plus de produits pour répondre à vos besoins.</p>
        <p className='md:text-[20px] text-[30px] font-bold text-center font-poppins'>L'équipe confirmera votre commande dans les plus brefs délais</p>

        <button onClick={() => navigate("/")}  className="w-[90%] cursor-pointer md:w-[30%] border mt-5 border-black text-center items-center  gap-12 py-3 relative rounded group overflow-hidden font-medium bg-white text-black inline-block">
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white items-center flex justify-center uppercase">Achetez plus</span>
        </button>
      </div>
        </div>
    </div>
  )
}

export default Success