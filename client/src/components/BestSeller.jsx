import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
    const {products} = useAppContext(); 
  return (
    <div className='mt-16'>
         <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 gap-6 mt-6" >
        

            {/* {products.map((product, index) => (<ProductCard key={index} product={product}/>))} */}

            {products.filter(product => product.inStock).slice(0, 5).map((product, index) => (<ProductCard key={index} product={product}/>))}
         </div>
       </div>
  )
}

export default BestSeller
