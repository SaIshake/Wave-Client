import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux";
import { putOrders, removeOrder, updateOrder } from '../redux/orderReducer';
import { wilaya } from '../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';






const Orders = () => {
    const orders = useSelector((state) => state.order.orders);
    const [success, setsuccess] = useState(false)
    const [orderId, setOrderId] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [adress, setAdress] = useState("")
    const [number, setNumber] = useState()
    const [wilayaName, setWilayaName] = useState("")

    const dispatch = useDispatch()
    useEffect(() => {
        const getOrders = async() => {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders/get-all`)
                dispatch(putOrders(res.data))
    
            } catch (error) {
            }
        }
        getOrders()
    }, [])
    const handleRemoveOrder = async (orderId) => {
        try {
            await axios.delete(`http://localhost:5000/api/orders/delete/${orderId}`);
            dispatch(removeOrder(orderId))
        } catch (error) {
            console.error('Error removing order:', error);
        }
    };

    const handleEdit = (id) => {
        const order = orders.find(order => order._id === id);
        if (order) {
          setOrderId(id);
          setFirstName(order.firstName);
          setSecondName(order.secondName);
          setAdress(order.address);
          setWilayaName(order.wilaya);
          setNumber(order.phoneNumber);
        }
      };

    
    const handleChange = async(e) => {
        const value = e.target.value.split("-")[1]
        setWilayaName(value)
    }

    const UpdateOrder = async(e) => {
        e.preventDefault()
        const data = {
            _id: orderId,
            firstName: firstName,
            secondName: secondName,
            wilaya: wilayaName,
            address: adress,
            phoneNumber: number,
          }
        try {
            const res = await axios.put(`http://localhost:5000/api/orders/update/${orderId}`, data)
            dispatch(updateOrder(data));  // Dispatch the updated order to the Redux store
            console.log(res.data)
            setOrderId("")
            setsuccess(true)
            toast.success('Successful modification', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
              });
        } catch (error) {
            console.log(error)
            setsuccess(false)
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
      <div className=' mt-24' />
      <div className="mx-2 h-[500px] mb-10">
                <h1 className="text-[#011936] text-center text-[40px] font-poppins font-bold mb-4"> {orders.length > 0 ? "Orders" : "No Orders"} </h1>
                <div className="flex flex-col md:w-[70%] m-2 sm:m-14 font-poppins font-semibold space-y-8">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white border-sky-900 border-[2px] flex flex-col space-y-10 md:flex-row rounded-lg p-6 shadow-md">
                          <div className='flex-1'>
                            {!(order._id == orderId) &&  <div>
                            <p className="text-gray-600 mb-2">First Name: {order.firstName}</p>
                            <p className="text-gray-600 mb-2">Second Name: {order.secondName}</p>
                            <p className="text-gray-600 mb-2">Wilaya: {order.wilaya}</p>
                            <p className="text-gray-600 mb-2">Adress: {order.address}</p>
                            <p className="text-gray-600 mb-2">Phone Number: {order.phoneNumber}</p>
                            <p className="text-gray-600 mb-2">Total: {order.amount}DA</p>
                            <p className="text-gray-600 mb-2">Status: {order.status}</p>
                            {order.status == "pending" && <div className="flex items-center space-x-3">
                            <button
                                onClick={() => handleRemoveOrder(order._id)}
                                className="bg-[#011936] mt-6 text-white px-4 py-2 rounded hover:bg-[#011936]"
                            >
                                Remove
                            </button>
                            <button
                                onClick={() => handleEdit(order._id)}
                                className="bg-[#011936] mt-6 text-white px-4 py-2 rounded hover:bg-[#011936]"
                            >
                                Edit
                            </button>
                            </div>}
                            </div>}
                            
                           {order._id == orderId && <form className='flex flex-col md:w-[80%] w-[100%] mx-2 items-start mt-5'>
                              <input onChange={(e) => setFirstName(e.target.value)} value={firstName}  type="text" className='py-2 w-full mt-5 px-2 border-[3px] border-[#011936] outline-none' placeholder='Nom اللقب'/>
                              <input onChange={(e) => setSecondName(e.target.value)} value={secondName}  type="text" className='py-2 w-full mt-5 px-2 border-[3px] border-[#011936] outline-none' placeholder='Prénom الاسم' required/>            
                              <input onChange={(e) => setAdress(e.target.value)} value={adress}  type="text" className='py-2 w-full mt-5 px-2 border-[3px] border-[#011936] outline-none' placeholder='Adresse العنوان' required/>
                              <select onChange={handleChange} required className='py-2 w-full mt-5 px-2 border-[3px] border-[#011936] outline-none' >
                                {wilaya.map((wilaya, index) => (
                                  <option key={index}>{wilaya?.id } - {wilaya?.name}</option>
                                ))}
                              </select>
                              <input onChange={(e) => setNumber(e.target.value)} value={number} type="tel" className='py-2 w-full mt-5 px-2 border-[3px] border-[#011936] outline-none' placeholder='Numero de telephone رقم الهاتف' required/>
                               <button onClick={UpdateOrder}
                                className="bg-[#011936] mt-6 text-white px-4 py-2 rounded hover:bg-[#011936]"
                                 >
                                  Update
                               </button>
                             </form>}

                          </div>
                          <div className='flex-1 space-y-10'>
                            {order.products.map((p, index) => (
                                <div className='flex flex-col md:flex-row md:space-x-5 space-y-5' key={index}>
                                    <div className="space-y-2 flex-1">
                                         <p className="text-gray-600 mb-2">Name: {p.title}</p>
                                         <p className="text-gray-600 mb-2">Id: {p.productId}</p>
                                         <p className="text-gray-600 mb-2">Price: {p.price}DA</p>
                                         <div className='flex items-center space-x-2'>
                                         <p className="text-gray-600 mb-2">Color:</p>
                                         <div 
                                         className="w-9 border border-black cursor-pointer h-9 rounded-full mr-2 mb-2" style={{ backgroundColor: p.color }}></div>
                                         </div>                                         
                                         <div className='flex items-center space-x-2'>
                                         <p className="text-gray-600 mb-2">Size:</p>
                                         <div className='w-9 h-9 flex items-center justify-center rounded-full mr-2 mb-2 cursor-pointer 
                                         bg-[#011936] text-white'>
                                          {p.size}
                                         </div>
                                         </div>
                                         <p className="text-gray-600 mb-2">Quantity: {p.quantity}</p>

                                    </div>
                                    <div className='flex-1'>
                                        <img src={p.img} className='rounded-sm' alt="" />
                                    </div>
                                </div>
                            ))}
                          
                          </div>
                          
                        </div>
                    ))}
                </div>
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
    </div>
  )
}

export default Orders