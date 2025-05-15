
import React, { useMemo } from 'react'; 

import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();

  // Filter products only when products or searchQuery change
  const filteredProducts = useMemo(() => {
    if (searchQuery.length > 0) {
      return products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return products;
  }, [products, searchQuery]);

  // Only show in-stock products
  const inStockProducts = filteredProducts.filter(product => product.inStock);

  return (
    <div className="mt-16 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 w-full">
      <div className="mb-6">
        <p className="text-2xl font-semibold md:text-3xl uppercase text-gray-800">
          All Products
        </p>
        <div className="w-16 h-1 bg-primary mt-1 rounded-full"></div>
      </div>

      {inStockProducts.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {inStockProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
