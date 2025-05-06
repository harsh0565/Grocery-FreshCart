
// Add address : /api/address/add

import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const {address} = req.body;
    const userId = req.user;
    // console.log(userId);
    // console.log(address);


    // Validate required fields
    if (!address.firstName ||!address.phone  ||!address.city ||!address.state ||!address.zipCode ) {
      return res.status(400).json({
        success: false,
        message: "All required address fields must be filled",
      });
    }


    const data  =  await Address.create({...address , userId});

    res.status(201).json({
      success: true,
      message: "Address added successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


// Get  addresses : /api/address/get

export const getAddresses = async (req, res) => {
  try {
    const userId = req.user;
    // console.log("ytfghi");
    // console.log(userId);
    // Validate required fields
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const addresses = await Address.find({ userId });
    // console.log(addresses);

    res.status(200).json({
      success: true,
      addresses,
      message: "Addresses fetched successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
