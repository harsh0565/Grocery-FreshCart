import cloudinary from "../config/cloudinary.js";
// import { v2 as cloudinary } from "cloudinary";
import Product from "./../models/Product.js";

//  Add product : /api/product/add
export const addProduct = async (req, res) => {
  let hasResponded = false; 
  try {
    const images = req.files;
    const productData = JSON.parse(req.body.productData);
    const uploadToCloudinary = (fileBuffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(error); 
            }
            resolve(result.secure_url); 
          }
        );
        stream.end(fileBuffer); 
      });
    };

    let imageUrls = [];
    try {
      imageUrls = await Promise.all(
        images.map((file) => uploadToCloudinary(file.buffer))
      );
    } catch (uploadErr) {
      console.error('Image upload failed:', uploadErr);
      if (!hasResponded) {
        hasResponded = true; 
        return res.status(500).json({
          success: false,
          message: "Image upload failed. Please try again.",
        });
      }
    }

  
    const data = await Product.create({...productData, images: imageUrls });

    if (!hasResponded) {
      hasResponded = true;
      console.log(data);
      console.log("Product added successfully");

      if (!hasResponded) {
      return res.status(200).json({
        success: true,
        message: "Product added successfully",
      });
    }
    }

  } catch (error) {
    console.error('Server error:', error);

    if (!hasResponded) {
      hasResponded = true; 
      return res.status(500).json({
        success: false,
        message: "An error occurred. Please try again later.",
      });
    }
  }
};
// List all products : /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); 

    res.status(200).json({
      success: true,
      count: products.length,
      products: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Get single product by ID : /api/product/:id
export const productById = async (req, res) => {
  try {
    const { id } = req.body; // Get id from URL params

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product: product,
      message: "Product fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
// Change stock of a product : /api/product/stock


export const changeStock = async (req, res) => {
    try {
        const { productId, inStock } = req.body;

        console.log(req.body); // Debugging: Log the request body

        // Validate productId and inStock
        if (!productId || inStock === undefined) {
            return res.status(400).json({
                success: false,
                message: "Product ID and stock value are required",
            });
        }

        // // Use findByIdAndUpdate to update the product's inStock value
        const product = await Product.findByIdAndUpdate(
            productId,
            { inStock },
            { new: true } // Return the updated product
        );

        // // If no product was found with that ID
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Return success with the updated product
        res.status(200).json({
            success: true,
            message: "Stock updated successfully",
            product,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};
