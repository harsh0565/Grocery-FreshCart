import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    // fetch seller status

    const fetchSellerStatus = async () => {
        try {
            const { data } = await axios.get("/api/seller/is-auth");

            if (data?.success) {
                setIsSeller(true);

            }
            else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    };

    // get cart item count
    const getCartCount = () => {
        let totalCount = 0;
        for (let productId in cartItems) {
            totalCount += cartItems[productId];
        }
        return totalCount;
    };
    // get cart item total price
    const getCartAmount = () => {
        let totalPrice = 0;
        for (let productId in cartItems) {
            const itemInfo = products.find((p) => p._id === productId);
            if (cartItems[productId] > 0 && itemInfo) {
                totalPrice += itemInfo.offerPrice * cartItems[productId];
            }
        }
        return Math.floor(totalPrice * 100) / 100;
    };


    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/is-auth");
            console.log(data);
            if (data?.success) {
                setUser(data.user);
                setCartItems(data.user.cartItem);
            }
            else {
                setUser(null);
                setCartItems({});
            }
        } catch (error) {
            console.log("Error fetching user:", error);
        }
    };

    const fetchProducts = async () => {
        // setProducts(dummyProducts);
        try {
            const { data } = await axios.get("/api/product/list");
            console.log(data);
            if (data?.success) {
                setProducts(data?.products);
                // toast.success(data.message);
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // add product to cart
    const addToCart = (itemId) => {
        const newCartItems = structuredClone(cartItems);
        if (newCartItems[itemId]) {
            newCartItems[itemId]++;
        } else {
            newCartItems[itemId] = 1;
        }
        setCartItems(newCartItems);
        // toast.success(`Added to cart.`);
    };

    // update cart item 

    const updateCartItem = (itemId, quantity) => {
        const newCartItems = structuredClone(cartItems);
        newCartItems[itemId] = quantity;
        setCartItems(newCartItems);
        // toast.success(`Updated quantity `);
    };


    // remove product from cart
    const removeFromCart = (itemId) => {
        const newCartItems = structuredClone(cartItems);
        if (newCartItems[itemId] > 1) {
            newCartItems[itemId]--;
        } else {
            delete newCartItems[itemId];
        }
        setCartItems(newCartItems);
        // toast.success(`Removed from cart.`);
    };
    useEffect(() => {
        fetchUser();
        fetchProducts();
        fetchSellerStatus();
    }, [])

    useEffect(() => {

        const updateCart = async () => {

            try {
                const { data } = await axios.post("/api/cart/update", { cartItems});
                console.log("updated data", data);
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        if (user) {
            updateCart();
        }
    }, [cartItems])

    const value = { navigate, user, setUser, fetchProducts , axios, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, setCartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount };
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
};

export const useAppContext = () => {
    return useContext(AppContext);
};

