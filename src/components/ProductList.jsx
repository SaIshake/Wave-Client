import React from 'react'
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import ProductCard from './ProductCard';


const ProductList = ({items}) => {

  return (
       <motion.div
       variants={fadeIn('down', 'tween', 0.1, 0.4)} className="mt-10 grid grid-cols-2 mx-6 sm:mx-10 gap-y-10 gap-x-3 sm:grid-cols-4 xl:gap-x-3">
      
       {items.map((item) => (
           <ProductCard  item={item} key={item._id} />
       ))}
   
   
       </motion.div>

  )
}

export default ProductList