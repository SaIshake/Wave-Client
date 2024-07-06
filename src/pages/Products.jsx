import React, { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import ProductList from '../components/ProductList'
import { motion } from 'framer-motion';
import { staggerContainer } from '../utils/motion';
import { makeRequest } from '../makeRequest';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import { useParams } from 'react-router-dom';
import { categories } from '../constants';




const Products = () => {
  const catLink = useParams().cat

  const [productTypes, setProductTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const filteredCategory = categories.filter(category => category.name === catLink);



  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the selected product type to the array
      setProductTypes(prevTypes => [...prevTypes, value]);
    } else {
      // Remove the deselected product type from the array
      setProductTypes(prevTypes => prevTypes.filter(type => type !== value));
    }
  };

  

  

  const products = useSelector(state => state.product.data);
 // Filtering products based on categories and selected product types
 const filteredProducts = products.filter(product => {
  const categoryMatch = product.categories.includes(catLink);

  // Helper function to get the first part of the subcategory (excluding the last word)
  const getBaseSubCategory = (subCat) => {
    const words = subCat.split(' ');
    if(words.length == 2) {
      return words.slice(0, -1).join(' '); // Remove the last word and join the rest
    } else if (words.length == 1) {
      return subCat
    }
  };

  const productTypeMatch = productTypes.length === 0 || product.subCategories.some(subCat => {
    const baseSubCat = getBaseSubCategory(subCat);
    return productTypes.includes(baseSubCat);
  });

  return categoryMatch && productTypeMatch;
});

// Function to handle sort order change
const handleSortOrderChange = (event) => {
  setSortOrder(event.target.value);
};
  // Sorting products based on the selected sort order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const getPrice = (product) => product.price2 !== null ? product.price2 : product.price;
  
    switch (sortOrder) {
      case 'lowToHigh':
        return getPrice(a) - getPrice(b);
      case 'highToLow':
        return getPrice(b) - getPrice(a);
      case 'newest':
        return b.isNew - a.isNew;
      case 'biggestHits':
        return b.bestSeller - a.bestSeller;
      case 'inStock':
        return b.inStock - a.inStock;
      default:
        return 0;
    }
  });
  
  
  return (
    <motion.div className='' variants={staggerContainer} viewport={{ once: true}}
    initial="hidden"
    whileInView="show">
      <Nav />
      <div className='mt-36' />
      <div className='m-10 text-start'>
        <h1 className='sm:text-[80px] text-[45px] font-poppins font-bold'>{catLink} Product</h1>
        {catLink == "Men" && <h6 className='font-poppins sm:w-[60%] font-semibold'>Shop our premium men's collection: sleek watches, stylish wallets, versatile shoes, and more. Elevate your look today!</h6>}
        {catLink == "Women" && <h6 className='font-poppins sm:w-[60%] font-semibold'>Discover our chic women's collection: elegant dresses, stylish handbags, versatile shoes, and more. Upgrade your look today!</h6>}
        {catLink == "Kids" && <h6 className='font-poppins sm:w-[60%] font-semibold'>Explore our adorable kids' collection: playful outfits, comfy shoes, cute accessories, and more. Make every moment stylish!</h6>}

      </div>
      <div className='flex md:flex-row flex-col mt-24'>
        <div className='md:flex-[0.4] px-4'>
          <h1 className='font-poppins font-bold text-[40px]'>Filtering</h1>
          <div className='flex md:flex-col flex-row space-x-4 md:space-x-0 md:space-y-6 font-poppins my-12'>
            <div className='md:border-t-2 border-r-2 md:border-r-0 flex-1 border-gray-600 py-4'>
              <h1 className='md:text-[30px] text-[25px] font-semibold font-poppins'>Sort By</h1>
              <form className='flex flex-col space-y-2'>
                <div className='flex space-x-4 mt-4'>
                  <h3 className='font-poppins font-medium md:text-[20px] text-[16px]'>Low To High</h3>
                  <input type="radio" name="sortOrder" value="lowToHigh" onChange={handleSortOrderChange}  />
                </div>
                <div className='flex space-x-4 mt-4'>
                  <h3 className='font-poppins font-medium md:text-[20px] text-[16px]'>High To Low</h3>
                  <input type="radio" name="sortOrder" value="highToLow" onChange={handleSortOrderChange}  />
                </div>
                <div className='flex space-x-4 mt-4'>
                  <h3 className='font-poppins font-medium md:text-[20px] text-[16px]'>Biggest Hits</h3>
                  <input type="radio" name="sortOrder" value="biggestHits" onChange={handleSortOrderChange}  />
                </div>
                <div className='flex space-x-4 mt-4'>
                  <h3 className='font-poppins font-medium md:text-[20px] text-[16px]'>Newest</h3>
                  <input type="radio" name="sortOrder" value="newest" onChange={handleSortOrderChange}  />
                </div>
                <div className='flex space-x-4 mt-4'>
                  <h3 className='font-poppins font-medium md:text-[20px] text-[16px]'>In Stock</h3>
                  <input type="radio" name="sortOrder" value="inStock" onChange={handleSortOrderChange}  />
                </div>
              </form>
            </div>
            <div className='md:border-t-2 flex-1 border-gray-600 py-4'>
              <h1 className='md:text-[30px] text-[25px] font-semibold font-poppins'>Products Type</h1>
              <form className='flex flex-col space-y-2'>
                {filteredCategory.map(c => (
                  c.subCat.map(sC => (
                  <div key={sC} className='flex space-x-4 mt-4'>
                    <h3 className='font-poppins font-medium md:text-[20px] text-[16px]'>{sC}</h3>
                    <input type="checkbox" value={sC} name="ProductType" onChange={handleCheckboxChange} />
                  </div>
                  ))
                ))}
              </form>
            </div>
          </div>
        </div>
        <div className="flex-[2]">
           {sortedProducts && <ProductList items={sortedProducts} />}
        </div>
      </div>

  
      <div className='mt-40' />
      <Footer />
    </motion.div>
  )
}

export default Products