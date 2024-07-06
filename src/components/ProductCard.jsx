import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({item}) => {
  console.log()
  return (
    <Link to={`/product/${item._id}`}>
  <div className="cursor-pointer">
    <div className="relative border-gray-700 border-[2px] overflow-hidden rounded-sm bg-gray-200 group">
      <img
        src={item?.img}
        className="h-full w-full z-[1] relative group-hover:duration-1000 object-cover group-hover:ease-in-out"
      />
      {item?.img2 && <img className='absolute object-cover w-full h-full top-0 left-0 bg-black group-hover:z-[2] group-hover:duration-1000 group-hover:ease-in-out'  src={item?.img2}
      />}
      <div className='z-[5] flex mx-2 sm:space-x-13 space-x-8'>
      {item?.new && <span className="bg-white top-0  z-[5] absolute  items-center text-center  sm:mt-2 mt-1  text-black sm:text-xs text-[8px] font-medium px-1.5 py-[1px] sm:px-2.5 sm:py-0.5 rounded dark:bg-black dark:text-black border border-black">New</span>}
      {item?.inStock && <span className="bg-gray-100 top-0  z-[5] absolute  items-center text-center sm:mt-2 mt-1  text-gray-800 sm:text-xs text-[8px] font-medium px-1.5 py-[1px] sm:px-2.5 sm:py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400">In Stock</span>}

      </div>

    </div>
    <div className=''>
        <h3 className="mt-4 sm:text-[23px] text-[10px] text-gray-700">{item?.title}</h3>
        <div className='flex flex-row space-x-2'>
        {item?.price2 && <p className="mt-1 text-[18px] sm:text-[25px] font-medium text-gray-700">{item?.price2}DA</p>}
        <p className={`mt-1 font-medium font-montserrat text-gray-700 text-[18px] sm:text-[25px] ${item?.price2 && "text-gray-500 line-through"}`}>{item?.price}DA</p>
        </div>
    </div>
  </div>
  </Link>
  )
}

export default ProductCard