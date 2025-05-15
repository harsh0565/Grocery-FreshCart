import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const BestSeller = () => {
  const { products } = useAppContext();
  return (

    <div className='mt-16'>
      <p className="text-2xl font-medium md:text-3xl">Best Sellers</p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="p-6 bg-white rounded-xl"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 gap-6 mt-6" >

          {products.filter(product => product.inStock).slice(0, 5).map((product, index) => (<ProductCard key={index} product={product} />))}
        </div>
      </motion.div>
    </div>
  )
}

export default BestSeller
