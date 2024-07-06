import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../redux/cartReducer';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { parseISO } from 'date-fns';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios"
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckIcon from '@mui/icons-material/Check';







const ProductD = ({item}) => {
  const cartProducts = useSelector((state) => state.cart.products);
  const {user, success} = useSelector(state => state.user)
  const [Error, seterror] = useState(false)
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1); // Add quantity state


  


  const dispatch = useDispatch()
  const createMarkup = (html) => {
    return { __html: html };
  };
  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Function to handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity < 50 ? prevQuantity + 1 : prevQuantity));
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
  };
  const userCartProducts = cartProducts.filter(
    (cartProduct) => cartProduct.userId === user._id
  );

  
  
  
  const existingProduct = userCartProducts.find(
    (cartProduct) =>
      cartProduct.productId === item._id &&
      cartProduct.color === selectedColor &&
      cartProduct.size === selectedSize
  )


  const addProductToCart = async() => {
    const product = {
      userId: user._id,
      productId: item._id,
      title: item?.title,
      color: selectedColor,
      size: selectedSize,
      img: item?.img,
      price: item?.price2 ? item?.price2 * quantity : item?.price * quantity,
      quantity: quantity

    }

    if (existingProduct) {
      // Update the quantity of the existing product
      
      const updatedProduct = { ...existingProduct, quantity: existingProduct.quantity + quantity, price: item?.price2 ? item?.price2 * (existingProduct.quantity + quantity) : item?.price * (existingProduct.quantity + quantity) };
      try {
        const res = await axios.put(`http://localhost:5000/api/carts/${updatedProduct._id}`, updatedProduct);
        dispatch(addToCart(updatedProduct));
      } catch (error) {
        console.log(error);
      }
    } else {
      // Add new product to the cart
      try {
        const res = await axios.post(`http://localhost:5000/api/carts/add`, product);
        dispatch(addToCart(res.data));
      } catch (error) {
        console.log(error);
        seterror(true)
        if(error.response.data.message == "Cart validation failed: color: Path `color` is required., size: Path `size` is required.") {
          toast.error("Please Choose Color And Size", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.response.data.message == "Cart validation failed: color: Path `color` is required.") {
          toast.error("Please Choose Color", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (error.response.data.message == "Cart validation failed: size: Path `size` is required.") {
          toast.error("Please Choose Size", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("There is a problem", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    }
  }





  return (
    <div className='md:mx-20 mx-2 my-10 mb-20 flex md:flex-row flex-col items-center md:items-start md:space-x-16'>
        <div className={`flex-[0.8] grid grid-cols-1`}>
          {item?.img2 ||  item?.images ? <Slider {...sliderSettings}>
            <div className=' w-[100%]'><img className='h-full w-full object-cover' src={item?.img} /></div>
            <div className=' w-[100%]'><img className='h-full w-full object-cover' src={item?.img2} /></div>
            {item?.images?.map((img, index) => (
              <div className='w-[100%]' key={index}><img className='h-full w-full object-cover' src={img} /></div>
            ))}
          </Slider> : <div className=' w-[100%]'><img className='h-full w-full object-cover' src={item?.img} /></div>}
        </div>


      <div className='flex-1 mt-10 sm:mt-0 flex flex-col space-x-9'>
            <div className='font-poppins flex font-bold my-5 text-[20px]'>
              <div>
              {item.categories?.map((i, index) => (
                <Link key={index} className='hover:text-[#011936] hover:underline' to={`/${i}`}> {i} </Link>
               ))}
               </div> 
               \
               {item.subCategories && item.subCategories.length > 0 && (
                <h1>{item.subCategories[0].split(" ")[0]}</h1>
            )}
            </div>
            <div className='mb-10'>
            {item?.new && <span className="bg-white cursor-pointer items-center text-center w-[20%] md:w-[10%] text-black text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-black dark:text-black border border-black">New</span>}
            {item?.inStock && <span className="bg-gray-100 cursor-pointer items-center text-center w-[30%] md:w-[20%] text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">In Stock</span>}
            </div>
            <h1 className='text-[30px] font-poppins font-semibold'>{item?.title}</h1>
              <div className='text-[25px] font-montserrat space-x-2 font-bold flex flex-row'>
              <h1>Price : </h1>
              {item?.price2 && <p className="text-gray-900">{item?.price2}DA</p>}
              <p className={`${item?.price2 ? "text-gray-700 line-through": "text-gray-900"}`}>{item?.price}DA</p>

              
              </div>
              <div className='flex flex-col space-y-8'>
              <div className="flex items-center mt-8">
          <h3 className="text-xl font-semibold font-poppins mr-4">Quantity:</h3>
          <div className="flex items-center">
            <button onClick={decreaseQuantity} className="w-10 font-medium font-poppins h-10 text-white flex items-center justify-center rounded-full bg-[#011936]">-</button>
            <span className="mx-4 font-poppins font-medium text-[18px]">{quantity}</span>
            <button onClick={increaseQuantity} className="w-10 h-10 font-medium font-poppins text-white flex items-center justify-center rounded-full bg-[#011936]">+</button>
          </div>
        </div>
              <div className="flex items-center my-4">
                <h3 className="text-xl font-poppins font-semibold mr-4">Size:</h3>
                <div className="flex flex-wrap">
                  {item.size?.map((size, index) => (
                    <div key={index} className={`w-10 h-10 flex items-center justify-center rounded-full mr-2 mb-2 cursor-pointer hover:text-white hover:bg-[#011936] ${
                      selectedSize === size ? 'bg-[#011936] text-white' : 'bg-gray-300'
                    }`} onClick={() => handleSizeSelect(size)}>
                       {size}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-semibold font-poppins mr-4">Color:</h3>
                <div className="flex flex-wrap">
                    {item.color?.map((color, index) => (
                       <div key={index}  onClick={() => handleColorSelect(color)}
                       className="w-8 border border-black flex justify-center items-center cursor-pointer h-8 rounded-full mr-2 mb-2" style={{ backgroundColor: color }}>
                         {selectedColor == color && ( color === "white" ? <CheckIcon className="text-black" /> : <CheckIcon className="text-white" />) }
                       </div>
                    ))}
                </div>
              </div>
              </div>
              {item?.inStock == true 
            ?
            user.isVerified ?
            <button onClick={() => addProductToCart()}  className="w-[80%] my-10 text-center items-center border border-[#011936] gap-12 py-3 relative rounded group overflow-hidden font-semibold font-poppins bg-[#011936] text-[white] inline-block cursor-pointer">
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#011936] group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white items-center flex justify-center uppercase">Add to cart</span>
            </button>
            :
            <Link to={`/login`}  className="w-[80%] my-10 text-center items-center border border-[#011936] gap-12 py-3 relative rounded group overflow-hidden font-semibold font-poppins bg-[#011936] text-[white] inline-block cursor-pointer">
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#011936] group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white items-center flex justify-center uppercase">Login To Shop</span>
            </Link>
            : 
            <button disabled className="w-[80%] uppercase my-10 text-center items-center border border-[#011936] gap-12 py-3 relative rounded group overflow-hidden font-semibold font-poppins bg-white text-[#011936] inline-block cursor-pointer">
            Out Of Stock
            </button>}
            
            
            <div>
              <div className="hidden text-[20px] my-3 sm:flex w-[80%] flex-col" dangerouslySetInnerHTML={createMarkup(item?.desc)}>
              </div>

            </div>

                </div>
        <div className='sm:hidden mx-1' dangerouslySetInnerHTML={createMarkup(item?.desc)} />
        {Error && <ToastContainer className="mt-20"
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
      />} 

    </div>

    
  )
}

export default ProductD