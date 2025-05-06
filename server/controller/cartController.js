
import User from './../models/User.js';

// Update User CartData : /api/cart/update
export const updateCart = async (req, res) => {
    try {
      const {  cartItems } = req.body;
  
      const userId = req.user;
      // console.log(userId);

      
  
      if (!userId || !cartItems) {
        return res.status(400).json({
          success: false,
          message: "User ID and cart data are required",
        });
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { cartItem: cartItems },
        { new: true } // return the updated document
      ).select("-password"); // exclude password from the response
  
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cartItem: updatedUser.cartItem,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
  };
  

//  Get User Cart Data  : /api/cart/id

export const getCart = async(req,res)=>{

}

//  Delete User Cart Data  : /api/cart/id

export const deleteCart = async(req,res)=>{

}


//  Add User to Cart  : /api/cart/add

export const addToCart = async(req,res)=>{

}
