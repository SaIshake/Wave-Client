import React from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import ProductD from '../components/ProductD'
import useFetch from '../hooks/useFetch'
import { useSelector } from 'react-redux'


const Product = () => {
  /*
  const id = useParams().id
  const { data } = useFetch(`/products/${id}?populate=*`);
  */
  const id = useParams().id
  //const { data } = useFetch(`/products/${id}?populate=*`);
  const products = useSelector(state => state.product.data);
  const fakeDate = {
    id: 0, 
    attributes: {

    }
  }
  const data = products.find(product => product._id == id) || fakeDate;
  return (
    <div>
      <Nav />
      <div className=' mt-48' />
      {data && <ProductD item={data} key={data._id}/>}
      <Footer />
    </div>
  )
}

export default Product