import React, { useState } from "react";
import { assets } from './../assets/assets';
import { useAppContext } from "../context/AppContext";
import { motion } from 'framer-motion';

const ProductCard = (props) => {
    const [count, setCount] = useState(0);
    const { product } = props;
    const { currency, addToCart, removeFromCart, navigate, cartItems, updateCartItem } = useAppContext();

    return product && (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            className="bg-white rounded-xl"
        >

            <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0); }} className="border border-gray-200 rounded-md px-3 py-2 bg-white w-full max-w-xs mx-auto sm:mx-0 transition hover:shadow-md">
                <div className="group cursor-pointer flex items-center justify-center px-2">
                    <img className="object-contain max-h-full group-hover:scale-105 transition-transform duration-200" src={product.images?.[0]} alt={product.name} />
                </div>
                <div className="text-gray-500/60 text-sm">
                    <p>{product.category}</p>
                    <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                    <div className="flex items-center gap-0.5">
                        {Array(5).fill('').map((_, i) => (
                            <img key={i} className="md:w-3.5 w3 " src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" />
                        ))}
                        <p>({4})</p>
                    </div>
                    <div className="flex items-end justify-between mt-3">
                        <p className="md:text-xl text-base font-medium text-primary">
                            {currency}{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                        </p>
                        <div onClick={(e) => { e.stopPropagation(); }} className="text-primary">
                            {!cartItems[product._id] ? (
                                <button className="flex items-center justify-center gap-1 bg-primary-100 border border-primary-300 md:w-[80px] w-[64px] h-[34px] rounded text-primary-600 cursor-pointer" onClick={() => addToCart(product._id)} >
                                    <img src={assets.cart_icon} alt="cart-icon" className="w-5 h-5" />
                                    Add
                                </button>
                            ) : (
                                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                    <button onClick={() => removeFromCart(product._id)} className="cursor-pointer text-md px-2 h-full" >
                                        -
                                    </button>
                                    <span className="w-5 text-center">{cartItems[product._id]}</span>
                                    <button onClick={() => updateCartItem(product._id, cartItems[product._id] + 1)} className="cursor-pointer text-md px-2 h-full" >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

    );
};

export default ProductCard;