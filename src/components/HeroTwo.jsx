import React from 'react'
import { categories } from '../constants'
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, zoom } from '../utils/motion';
import { TitleText, TypingText } from './Text';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';
import men2photo from '../constants';

const HeroTwo = () => {
  
  return (
    <div id='discover' className='flex flex-col space-y-5 sm:space-y-16 mt-10'>
      {categories.map(item => (
            <div key={item.id} className={`flex sm:h-[600px] rounded-3xl justify-center items-center px-6 sm:mx-16 mx-6 sm:px-10 ${item.name === "Men" && "bg-gray-400"} ${item.name === "Women" && "bg-pink-300"} bg-amber-300 `}>
              <div className='sm:flex-[1.1] flex-1 flex flex-col sm:space-y-24'>
                 <h1 className='sm:text-[75px] text-[15px] leading-[5vw] sm:leading-[9vw] md:leading-[5vw] text-[#011936] font-poppins my-2 sm:my-10 font-bold'>{item.action}</h1>
                 <Link to={`/${item.name}`} className={`bg-[#011936] text-[13px] sm:text-[25px] w-[50%] sm:w-[70%] md:w-[50%] lg:w-[30%] text-center mb-8 font-poppins hover:bg-[#011936] text-white font-semibold py-[4px] px-[4px] sm:py-5 sm:px-11 rounded`}>
                      Discover
                  </Link>
              </div>
              <div className={`sm:mt-5 sm:flex-1 flex-1`}>
                <img className='' src={item.img} alt="" />
              </div>
            </div>
      ))}
    </div>
  )
}

export default HeroTwo