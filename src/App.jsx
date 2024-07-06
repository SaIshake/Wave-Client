import { useDispatch, useSelector } from "react-redux"
import Confirm from "./pages/Confirm"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Products from "./pages/Products"
import { useEffect, useState } from "react"
import "./index.css"
import axios from "axios"


import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import { Navigate  } from 'react-router-dom'

import { putAllData } from "./redux/productReducer"
import { makeRequest } from "./makeRequest"
import Custom from "./pages/Custom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Verification from "./pages/Verification"
import { putCartFromDB } from "./redux/cartReducer"
import Orders from "./pages/Orders"
import Admin from "./pages/Admin"


axios.defaults.withCredentials = true

const App = () => {
  const dispatch = useDispatch();
  const {user, success} = useSelector(state => state.user)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/shop",
      element: <Products />,
    },
    {
      path: "/custom",
      element: <Custom />,
    },
    {
      path: "/:cat",
      element: <Products />,
    },
    {
      path: "/confirm",
      element: <Confirm />,
    },
    {
      path: "/product/:id",
      element: <Product />,
    },
    {
      path: "/orders",
      element: user.isVerified ? <Orders/> : <Navigate to="/"  />,
    },
    {
      path: "/admin",
      element: user.isAdmin ? <Admin /> : <Navigate to="/"  />,
    },
    {
      path: "/login",
      element: !user.isVerified ? <Login/> : <Navigate to="/"  />,
    },
    {
      path: "/register",
      element: (Object.keys(user).length == 0) ? <Register/> : <Navigate to="/" />,
    },
    {
      path: "/verification",
      element: (!user.isVerified) && (Object.keys(user).length > 0) ? <Verification/> : <Navigate to="/" />,
    },
  ]);




  useEffect(() => {
    const getAlldata = async () => {
      try {
        const res = await makeRequest.get(`/api/products`);
        dispatch(putAllData(res.data))
      } catch (error) {
      }
    }
    getAlldata()
    const getCart = async () => {
      try {
        const res = await makeRequest.get(`/api/carts/find`);
        dispatch(putCartFromDB(res.data))
      } catch (error) {
      }
    }
    getCart()
  }, [])



  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App