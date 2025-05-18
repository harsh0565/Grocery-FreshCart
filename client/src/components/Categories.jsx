import React from 'react'
import { assets, categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
    const {navigate} = useAppContext();
  return (
    
    <div className='mt-16'>
      <p className="text-2xl font-medium md:text-3xl">Categories</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6">
        {categories.map((category, index) => (
          <div id='scale'
            key={index}
            className="group flex flex-col items-center justify-center cursor-pointer gap-2 py-5 px-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-120 transition duration-300 max-w-28 h-20 " 
            />
            <p className="font-medium text-sm">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories
