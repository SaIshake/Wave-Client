import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { TypingText } from '../components/Text'
import { useDispatch, useSelector } from 'react-redux'
import { makeRequest } from '../makeRequest'
import { useNavigate } from 'react-router-dom'
import { resetCart, setSuccess } from '../redux/cartReducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { wilaya } from '../constants';



const Confirm = () => {
    const navigate = useNavigate()
    const cartProducts = useSelector((state) => state.cart.products);
    const success = useSelector((state) => state.cart.success);

    const dispatch = useDispatch()
    const [error, setError] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [adress, setAdress] = useState("")
    const [number, setNumber] = useState("")
    //const [success, setSuccess] = useState(true)
    const [priceChecked, setPriceChecked] = useState(false)
    const [wilayaName, setWilayaName] = useState("")
    const [totalPrice, settotalPrice] = useState()

    /*
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await makeRequest.get(`/wilayas`);
          setWilayas(res.data.data)
        } catch (err) {
          console.log(err);
        }
      };
      fetchData(); 
    }, [])
    */
    //const sortedWilayas = wilayas.slice().sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));

    const handleChange = async(e) => {
      const value = e.target.value.split("-")[1]
      setWilayaName(value)
    }
    const totalPriceCalculate = () => {
      let total = 0;
      cartProducts.forEach((item) => {
        total += item.price;
      });
      return total;
    };
    const handleChange2 = (e) => {
      setPriceChecked(true)
      const value = parseFloat(e.target.value.split(" ")[2])
      settotalPrice(value + totalPriceCalculate())
    }


    const handleSubmit = async(e) => {
        setError(false)
        e.preventDefault()
        if(wilayaName === "") {
          toast.error('Selectionez Votre Wilaya', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setError(true)
          return;
        }
        const data = {
          products: cartProducts,
          amount: totalPriceCalculate(),
          firstName: firstName,
          secondName: secondName,
          wilaya: wilayaName,
          address: adress,
          phoneNumber: number,
        }
        try {
          const res = await makeRequest.post("/api/orders", data);
          dispatch(setSuccess(true))
          dispatch(resetCart())
          const res2 = await axios.delete(`http://localhost:5000/api/carts/deleteAll`)
          toast.success('Confirmation Success', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
          });
          setFirstName("")
          setSecondName("")
          setAdress("")
          setNumber("")
          setWilayaName("")
          setTimeout(() => {
            navigate("/orders")
          }, 7000);

        } catch (err) {
          console.log(err);
          toast.error('Try Again', {
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

  return (
    <div className=''>
      <Nav />
      <div className='my-36 rounded-md flex flex-col justify-center items-center text-[#011936]'>
        <h1 className='md:text-[40px] text-[30px] font-poppins font-semibold underline'>Client Informations</h1>
        <motion.form variants={staggerContainer} viewport={{ once: true}} onSubmit={(e) => handleSubmit(e)}
    initial="hidden"
    whileInView="show" className='flex flex-col mx-2 items-center mt-5'>
            <TypingText  title="| Please enter the following information to receive your package" textStyles='text-[12px] mb-5 md:text-[20px]' />
            <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" className='w-[90%] md:w-[200%] py-2 mt-5 px-2 border-[3px] border-[#011936] outline-none' placeholder='First Name اللقب'/>
            <input onChange={(e) => setSecondName(e.target.value)} value={secondName} type="text" className='w-[90%] md:w-[200%] py-2 mt-5 px-2 border-[3px] border-[#011936] outline-none' placeholder='Second Name الاسم' required/>            
            <input onChange={(e) => setAdress(e.target.value)} value={adress} type="text" className='w-[90%] md:w-[200%] py-2 mt-5 px-2 border-[3px] border-[#011936] outline-none' placeholder='Address العنوان' required/>
            <select required className='w-[90%] md:w-[200%] py-2 mt-5 px-2 border-[3px] border-[#011936] outline-none' defaultValue="wilaya" onChange={handleChange}>
              <option>Wilaya</option>
              {wilaya.map((wilaya, index) => (
                <option key={index}>{wilaya?.id } - {wilaya?.name}</option>
              ))}
            </select>
            {error && <ToastContainer className="mt-20"
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
            {/*wilayaChecked && <select className='w-[90%] md:w-[200%] py-2 mt-5 px-2 border-[3px] border-black outline-none' defaultValue="Shipping Type (نوع التوصيل)" onChange={handleChange2}>
              <option disabled>Type De Livraison (نوع التوصيل)</option>
              <option>Domicil : {wilayaD?.attributes?.domicil} DA</option>
              <option>StopDesk : {wilayaD?.attributes?.stopDesk} DA</option>
              </select>*/}
            <input onChange={(e) => setNumber(e.target.value)} value={number} type="tel" className='w-[90%] md:w-[200%] py-2 mt-5 px-2 border-[3px] border-[#011936] outline-none' placeholder='Phone Number رقم الهاتف' required/>
            {/*priceChecked && <h2 className='text-[20px] font-bold my-10'>Prix Total : <span>{totalPrice} DA</span></h2>*/}
            <button type='submit' className="w-[90%] cursor-pointer md:w-[200%] border mt-5 border-[#011936] text-center items-center  gap-12 py-3 relative rounded group overflow-hidden font-medium bg-[#011936] text-white uppercase inline-block">
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#011936] group-hover:h-full opacity-90"></span>
              <span className="relative group-hover:text-white items-center flex justify-center">confirm</span>
            </button>
        </motion.form>
      </div>
      {success ?       <ToastContainer className="mt-20"
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
      /> : <ToastContainer className="mt-20"
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

      <Footer />
    </div>
  )
}

export default Confirm