import React from 'react'
import { banner, banner2 } from '../constants'
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, zoom } from '../utils/motion';
import { TitleText, TypingText } from './Text';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';

const Hero = () => {
  
  return (
    <motion.div id='home'      variants={staggerContainer}
    initial="hidden"
    whileInView="show" className='w-full overflow-hidden relative mt-[80px]'>
        <motion.img     
        initial="hidden"
        variants={zoom} 
        whileInView="show"    
        transition={{ duration: 1.5 }}
        viewport={{ once: false}}
        className='flex w-full h-full object-cover overflow-hidden' src={banner} alt="" />
                <div className='absolute w-full h-[100%] top-0 left-0 bg-black/30' />

        <motion.div initial="hidden"
 variants={fadeIn('down', 'tween', 0.3, 0.5)}             whileInView="show"    
 viewport={{ once: true}}  className='absolute cursor-pointer md:space-y-4 inset-0 flex flex-col leading  mx-10 mt-10 md:my-40 md:mx-80 items-center text-center top-0  text-white'>
            <TitleText  textStyles='uppercase font-jost text-[8vw] md:text-[6vw] font-bold md:leading-[5vw] leading-[8vw] font-[150] tracking-tighter' title="Shop With Wave For Clothing!" />
            <h1 className='text-[2.1vw] md:text-[1.6vw] md:w-[80%] w-full font-medium font-poppins'>Discover the latest trends in fashion at our online store. From casual wear to formal attire, we offer a diverse selection of high-quality clothing to suit every taste and occasion. </h1>
            <a href="#discover" className="bg-[white] sm:py-4 mt-2 border uppercase font-poppins font-bold  text-center w-[60%] md:w-[40%] hover:bg-[white] text-black py-[1px] px-5 rounded">
              Discover
            </a>
        </motion.div>


    </motion.div>
  )
}

export default Hero