import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion';
import { navVariants, fadeIn, fadeIn2 } from '../utils/motion';
import { categories, vv } from '../constants';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart, toConfirm, updateCartItem } from '../redux/cartReducer';
import { Badge } from '@mui/material';
import { logout } from '../redux/user';
import axios from "axios"
import CheckIcon from '@mui/icons-material/Check';




axios.defaults.withCredentials = true
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
    const {user, success} = useSelector(state => state.user)
    const cartProducts = useSelector((state) => state.cart.products);
    const [ProductData, setProductData] = useState(null)
    const [editedSize, setEditedSize] = useState(null);
  const [editedColor, setEditedColor] = useState(null);
  const [editedQuantity, setEditedQuantity] = useState(1);
  const [cartId, setcartId] = useState("")

    const dispatch = useDispatch()
    const totalPrice = () => {
      let total = 0;
      cartProducts.forEach((item) => {
        total += item.price;
      });
      return parseFloat(total).toFixed(2);
    };
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("Home"); 
    const [toggle, settoggle] = useState(false)
    const [isCartO, setIsCartO] = useState(false)
    const handleToggle = (e) => {
      e.preventDefault()
      settoggle(!toggle)
    }
    const openCart = (e) => {
      e.preventDefault()
      setIsCartO(!isCartO)
    }
  
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 50) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, []);
    const handleLogout = async(e) => {
      e.preventDefault()
      try {
        const res = await axios.post(`http://localhost:5000/api/logout`)
        dispatch(logout())
        localStorage.clear()
        navigate("/")
      } catch (error) {
      }
    }

    const handleDelete = async(id) => {
      console.log(id)
      try {
        const res = await axios.delete(`http://localhost:5000/api/carts/delete/${id}`)
        dispatch(removeItem(id))
      } catch (error) {
      }
    }

    const deleteAll = async() => {
      try {
        const res = await axios.delete(`http://localhost:5000/api/carts/deleteAll`)
        dispatch(resetCart())
      } catch (error) {
      }
    }


    const handleEdit = async(productId, product, cart) => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/find/${productId}`)
        setcartId(cart)
        console.log(cart)
        setProductData(res.data)
        setEdit(!edit)
        setEditedColor(product.color)
        setEditedQuantity(product.quantity)
        setEditedSize(product.size)
        console.log(res.data, editedColor, editedQuantity, editedSize)
      } catch (error) {
        console.log(error)
      }

    }
    const CloseEditing = () => {
      setcartId("")
      setProductData(null)
      setEdit(!edit)
      setEditedColor(null)
      setEditedSize(null)
      setEditedQuantity(1)
    }

    const updateCart = async(cart) => {
      try {
        const res = await axios.put(`http://localhost:5000/api/carts/${cart._id}`, {
        size: editedSize,
        color: editedColor,
        quantity: editedQuantity,
        price: editedQuantity * cart.price
      });
      dispatch(
        updateCartItem({
          cartId: cart._id,
          size: editedSize,
          color: editedColor,
          quantity: editedQuantity,
          price: editedQuantity * cart.price
        })
      );
      console.log(res.data)
      CloseEditing()
      } catch (error) {
        console.log(error)
      }

    }

  return ( 
    <div className='flex flex-col'>
    <motion.nav  className={`sm:px-12 py-8 border-b-2 px-6 w-full flex top-0 fixed items-center h-20 z-[10] bg-white ease-in-out duration-300 text-black`}>
          {        /*<div className='sm:hidden flex flex-1'>
          {toggle ? <CloseIcon className='z-[10] cursor-pointer' onClick={handleToggle} /> : <MenuIcon className='z-[10] cursor-pointer' onClick={handleToggle} />}
  </div>*/}
          <div className='flex space-x-5 items-center md:mr-32 mr-20 sm:mr-28 flex-1'>
            <Link to={`/`}>
            <motion.img variants={fadeIn('right', 'tween', 0.2, 0.3)} initial="hidden"
             whileInView="show" className='w-[80px] h-[80px] cursor-pointer object-contain' src={vv} />
            </Link>
          <div className='md:flex hidden items-center justify-center space-x-5'>
            {categories.map(c => (
                          <div key={c.id} className='cursor-pointer uppercase font-semibold'>
                            <Link to={`/${c.name}`}>{c.name}</Link>
                          </div>
            ))}
            <div className='cursor-pointer uppercase font-semibold'>
              <a href={`#about`}>About</a>
            </div>
             </div>
          </div>

        <div className='flex items-center justify-center space-x-5 z-[20]'>
        {user.isVerified ?
          <div className='flex items-center space-x-7'>
            <Badge badgeContent={!cartProducts.length ? "0" : cartProducts.length} color="primary">
               <ShoppingBagIcon className='z-[20] cursor-pointer' onClick={openCart} />
            </Badge>
 <div className="relative">
      {/* Circle */}
      <h1 onClick={toggleDropdown} className='h-[35px] cursor-pointer w-[35px] flex items-center p-[26px] justify-center text-[20px] text-white font-poppins font-semibold rounded-full bg-sky-900'>
              {isOpen ? <CloseIcon />: user.username.slice(0,2)}
            </h1>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 p-4 mt-2 w-48 bg-white border rounded shadow-lg flex">
          <div className="divide-y flex flex-col space-y-4">
            <Link to={`/orders`} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Orders</Link>
            {user.isAdmin && <Link to={`/admin`} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Admin</Link>}
            <Link onClick={handleLogout} className="py-2 px-4 hover:bg-gray-200 cursor-pointer">Logout</Link>
          </div>
        </div>
      )}
    </div>

          </div> :
            <div className='flex items-center sm:space-x-4 space-x-2 justify-center'>
              <Link to={`/register`} className="bg-[#011936] font-poppins hover:bg-[#011936] text-white font-semibold py-[4px] px-[4px] sm:py-3 sm:px-5 rounded">
                Sign up
              </Link>
              <Link to={`/login`} className="hover:text-[#2b4463] font-poppins text-[#011936] font-semibold py-[4px] px-[4px] sm:py-3 sm:px-5 rounded">
                Login
              </Link>
            </div> 
            }
            <div className='md:hidden flex  justify-end items-center'>
              {toggle ? <CloseIcon className='z-[10] cursor-pointer' onClick={handleToggle} /> : <MenuIcon className='z-[10] cursor-pointer' onClick={handleToggle} />}
            </div>
        </div>
        
 
  
    </motion.nav>
    <motion.div className={`${toggle ? "fixed left-0 top-0" : "fixed left-[-100%] top-0"} bg-slate-300 space-y-10 font-poppins font-semibold z-[30] w-[50%] pt-40 px-5 h-full ease-in-out duration-500 `}>
    {categories.map(c => (
                          <div key={c.id} className='cursor-pointer uppercase font-semibold'>
                            <Link to={`/${c.name}`}>{c.name}</Link>
                          </div>
            ))}
            <div className='cursor-pointer uppercase font-semibold'>
              <a href={`#about`}>About</a>
            </div>
    </motion.div>



    <motion.div className={`${isCartO ? "fixed right-0 top-0" : "fixed right-[-100%] top-0"} bg-gray-100 z-[30] overflow-scroll overflow-x-hidden w-[90%] md:w-[40%] sm:w-[50%] pt-20 px-5 h-full ease-in-out duration-500 `}>
            <div className='flex items-center justify-between border-b-2 border-black p-2'>
              <div className='flex items-center justify-between w-full'>
                    <h1 className='text-[20px] font-poppins font-bold text-black'>Cart</h1>
                    <CloseIcon className='z-[20] text-black cursor-pointer' onClick={openCart} />
              </div>
              {cartProducts.length > 0 && <Link to="/confirm" className="border border-black text-center items-center px-5 gap-12 py-3 relative rounded group overflow-hidden font-medium bg-white text-black inline-block cursor-pointer">
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-black group-hover:h-full opacity-90"></span>
                <span className="relative group-hover:text-white items-center flex justify-center">CONFIRM</span>
              </Link>}
            </div>
            {cartProducts?.map(product => (
                          <div key={product._id} className='flex flex-col items-start space-y-5 mt-10'>
                            <div className='flex space-x-4'>
                              <img src={product.img} alt="" className='w-[40%]' />
                              <div className='flex flex-col space-y-2'>
                                <h1 className='md:text-[25px] font-poppins font-semibold text-[15px] text-gray-700'>{product.title}</h1>
                                <h1 className='text-[25px] font-poppins font-semibold text-gray-700'>{parseFloat(product.price).toFixed(2)}DA</h1>
                                <h1 className='font-poppins font-black text-[18px] text-gray-700'>Quantity: {product.quantity} </h1>
                              </div>
                              <div className='flex'>
                              <DeleteIcon className='cursor-pointer' onClick={() => handleDelete(product._id) } />
                              {!(ProductData?._id == product.productId && cartId == product._id ) ? <EditIcon className='cursor-pointer' onClick={() => handleEdit(product.productId, product, product._id) } /> : <CloseIcon onClick={CloseEditing} className='cursor-pointer' />}
                              </div>
                            </div>
                           {!(ProductData?._id == product.productId && cartId == product._id ) && <div className='flex items-center justify-center space-x-10'>
                           <div className='flex items-center space-x-2'>
                            <h1 className='font-poppins font-black text-[18px]'>Color: </h1>
                            <div className="w-10 cursor-pointer h-10 rounded-full mr-2 mb-2" style={{ backgroundColor: product.color }}></div>
                           </div>
                           <div className='flex items-center space-x-2'>
                            <h1 className='font-poppins font-black text-[18px]'>Size: </h1>
                            <div  className={`w-10 h-10 flex items-center justify-center rounded-full mr-2 mb-2 cursor-pointer  
                             bg-[#011936] text-white`} >
                               {product.size}
                            </div>
                           </div>                           
                          </div>}
                          {(ProductData?._id == product.productId && cartId == product._id) && 
                          <div>
                            {/* Quantity Control */}
            <div className="flex items-center">
              <h3 className="text-xl font-semibold font-poppins mr-4">Quantity:</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setEditedQuantity(editedQuantity - 1)}
                  disabled={editedQuantity === 1}
                  className="w-10 font-medium font-poppins h-10 text-white flex items-center justify-center rounded-full bg-[#011936]"
                >
                  -
                </button>
                <span className="mx-4 font-poppins font-medium text-[18px]">{editedQuantity}</span>
                <button
                  onClick={() => setEditedQuantity(editedQuantity + 1)}
                  className="w-10 h-10 font-medium font-poppins text-white flex items-center justify-center rounded-full bg-[#011936]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Size Selection */}
            <div className="flex items-center my-4">
              <h3 className="text-xl font-poppins font-semibold mr-4">Size:</h3>
              <div className="flex flex-wrap">
                {
                  ProductData.size.map((size, index) => (
                    <div
                      key={index}
                      className={`w-10 h-10 flex font-poppins items-center justify-center rounded-full mr-2 mb-2 cursor-pointer hover:text-white hover:bg-[#011936] ${
                        editedSize === size ? 'bg-[#011936] text-white' : 'bg-gray-300'
                      }`}
                      onClick={() => setEditedSize(size)}
                    >
                      {size}
                    </div>
                  ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="flex items-center mb-4">
              <h3 className="text-xl font-semibold font-poppins mr-4">Color:</h3>
              <div className="flex flex-wrap">
                {
                  ProductData.color.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => setEditedColor(color)}
                      className="w-8 border border-black flex justify-center items-center cursor-pointer h-8 rounded-full mr-2 mb-2"
                      style={{ backgroundColor: color }}
                    >
                      {editedColor == color && ( color === "white" ? <CheckIcon className="text-black" /> : <CheckIcon className="text-white" />) }
                    </div>
                  ))}
              </div>
            </div>
            <button onClick={() => updateCart(product)} className="focus:outline-none cursor-pointer text-white bg-black font-poppins focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Update</button>

                          </div>

                         }
                        </div>
            ))}
            <div className='my-10 space-y-6'>
              <h1 className='text-[20px] font-bold'>Total Price: <span className='text-[#011936] font-poppins'>{totalPrice()}DA</span></h1>
              <button onClick={() => deleteAll()} className="focus:outline-none cursor-pointer text-white bg-[#011936] font-poppins hover:bg-[#011936] focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Clear All</button>
            </div>
          </motion.div> 

    
    </div>
  )
}

export default Nav