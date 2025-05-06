
import jwt  from 'jsonwebtoken';
// Login Seller 
export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if email and password are provided
        if (!email ||!password) {
            return res.status(400).json({
                success: false,
                message: "Please provide both email and password.",
            });
        }

        if(password==process.env.SELLER_PASSWORD && email==process.env.SELLER_EMAIL){

            const sellerToken = jwt.sign({ email}, process.env.JWT_SECRET, {
                expiresIn: "7D",
            });

            res.cookie("sellerToken", sellerToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            });


            return res.status(200).json({
                success: true,
                message: "Login successful.",
            });
        }
        else{
            return res.json({
                success: false,
                message: "Invalid email or password.",
            });
        }
    } catch (error) {
        console.error(error.message);
        res.json({
            success: false,
            error: "Server error. Please try again later.",
        });
    }
}

export const isSellerAuth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Authorized",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};

export const logoutSeller = async (req, res) => {
    try {
      res.clearCookie("sellerToken",{
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production"? "none" : "strict",
    
      });
      return res.status(200).json({
        success: true,
        message: "Logout successful!",
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        success: false,
        error: "Server error. Please try again later.",
      });
    }
  };