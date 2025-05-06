import React from 'react';
import { useAppContext } from '../context/AppContext';
import { categories } from '../assets/assets';
import { useParams } from 'react-router-dom'; // You forgot to import this!
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams(); // Getting the category from the URL.
    console.log(category);

    // Filter products based on category
    const filteredProducts = products.filter(
        (product) => product.category.toLowerCase() === category
    );

    // Find the matching category details
    const searchCategory = categories.find(
        (c) => c.path.toLowerCase() === category.toLowerCase()
    );

    return (
        <div className="mt-16">
            {searchCategory && (
                <div className="flex flex-col items-end w-max">
                    <p className="text-2xl font-medium uppercase">{searchCategory.text}</p>

                    <div className="w-16 h-0.5 bg-primary rounded-full my-2"></div>
                </div>
            )}
           {filteredProducts.length === 0 && (
  <div className="flex flex-col items-center justify-center mt-10">
    <p className="text-lg font-semibold text-gray-600">No products available in this category.</p>
    <p className="text-sm text-gray-400 mt-2">Please explore other categories or check back later!</p>
  </div>
)}



            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6">
                {filteredProducts.map((product, index) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductCategory;
