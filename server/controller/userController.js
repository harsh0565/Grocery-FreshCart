import bcrypt from "bcryptjs"; // for hashing password
import User from "../models/User.js";
import jwt from "jsonwebtoken"; // for generating JWT
import nodemailer from "nodemailer";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body);

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already registered. Please login instead.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      cartItem: {},
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1D",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // for enabling cross-site scripting (XSS) protection in production environment
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      maxAge: 60 * 60 * 24 * 1000, 
    });

    return res.status(201).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      message: "User registered successfully.",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};

// Login

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "Email not Registered. Please register instead.",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1D",
    });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      maxAge: 60 * 60 * 24 * 1000, 
    });

    // Respond with user info
    return res.status(200).json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
      message: "Login successful!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server error. Please try again later.",
    });
  }
};

//  check authorization
export const isAuth = async (req, res) => {
  try {
    const userId = req.user; 
    const user = await User.findById(userId).select("-password");

    return res.status(200).json({
      success: true,
      user: user,
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


// logout
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token",{
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

const otpStore = new Map(); // email -> { otp, name, expiresAt }




// In-memory OTP store (keep this somewhere accessible in your controller)

export const sendOtp = async (req, res) => {
    const { email } = req.body;
    const name= req.body.name || "Sir";

    if (!name || !email) {
        return res.status(400).json({ success: false, message: "Name and email are required." });
    }

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = Date.now() + 5 * 60 * 1000;

        otpStore.set(email, { otp, name, expiresAt });

        // Email Transporter Setup (using Gmail SMTP)
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,     
                pass: process.env.EMAIL_PASS,     
            },
        });

        // Email Options
        const mailOptions = {
          from: `"Sengar Grocery Store" <no-reply@sengargrocery.com>`, // Corrected format
          to: email,
          subject: "Your OTP Code - Sengar Grocery Store",
          html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                  <h2 style="color: #2c3e50; text-align: center;">Sengar Grocery Store</h2>
                  <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
                  <p style="font-size: 16px;">Thanks for signing up! Please use the following One-Time Password (OTP) to complete your registration:</p>
                  <div style="text-align: center; margin: 20px 0;">
                      <span style="font-size: 24px; font-weight: bold; background-color: #eaf6ff; padding: 10px 20px; border-radius: 6px; display: inline-block; border: 1px solid #007BFF; color: #007BFF;">
                          ${otp}
                      </span>
                  </div>
                  <p style="font-size: 14px; color: #555;">This OTP is valid for <strong>5 minutes</strong>. If you didn't request this, please ignore this email.</p>
                  <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;">
                  <p style="font-size: 12px; color: #888; text-align: center;">&copy; ${new Date().getFullYear()} Sengar Grocery Store. All rights reserved.</p>
              </div>
          `,
      };
      

        // Send Email
        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: "OTP sent to your email." });
    } catch (err) {
        console.error("Send OTP Error:", err);
        return res.status(500).json({ success: false, message: "Server error while sending OTP." });
    }
};



// import { otpStore } from './userController.js'; // assuming sendOtp is in the same file

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }

    const record = otpStore.get(email);

    if (!record) {
        return res.status(400).json({ success: false, message: "No OTP sent to this email." });
    }

    const { otp: storedOtp, expiresAt } = record;

    if (Date.now() > expiresAt) {
        otpStore.delete(email);
        return res.status(400).json({ success: false, message: "OTP expired." });
    }

    if (otp !== storedOtp) {
        return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // OTP verified, clean up
    otpStore.delete(email);

    return res.status(200).json({ success: true, message: "OTP verified successfully." });
};




export const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Validate inputs
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: "Email and new password are required." });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });

    return res.status(200).json({ success: true, message: "Password reset successful." });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ success: false, message: "Server error while resetting password." });
  }
};
