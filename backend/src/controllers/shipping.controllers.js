import { Shipping } from "../models/shipping.models.js";

const shippingdetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, contact, country, street, city, state, zip } = req.body;

    
    if (!name || !contact || !street || !country) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await Shipping.findOne({
      userId,
    });
    if (user) {
      return res.status(400).json(
         "User had already registered shipping address",
      );
    }
    const addAddress = await Shipping.create({
      name,
      contact,
      country,
      street,
      city,
      state,
      zip,
      userId: req.user.id,
    });

    return res.status(200).json({
      message: "Shipping address added.",
      data: addAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error! unable to add shippimg address",
      error: error.message,
    });
  }
};

// edit shipping address
const editShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, contact, country, street, city, state, zip } = req.body;
    if (!id) {
      return res.status(401).json({
        message: "server error! unable to find shipping address",
        message: error.message,
      });
    }

    const updatedAddress = await Shipping.findByIdAndUpdate(
      id,
      {
        name,
        contact,
        country,
        street,
        city,
        state,
        zip,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      message: "Shipping Address Updated successfully",
      data: updatedAddress,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error! unable to update shippimg address",
      error: error.message,
    });
  }
};

// /delete shipping address
const deleteShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await Shipping.findByIdAndDelete(id);
    if (!deletedAddress) {
      return res.status(401).json({
        message: "unable to find shipping address",
        message: error.message,
      });
    }

    return res.status(200).json({
      message: "Shipping address deleted",
      data: deletedAddress,
    });
  } catch (error) {
    return res.status(401).json({
      message: "server error! unable to delete shippimg address",
      message: error.message,
    });
  }
};

// get shipping details
const getShippingDetails = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id);

    const details = await Shipping.findOne({ userId: id });
    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(401).json({
      message: "server error while fetching product",
      message: error.message,
    });
  }
};

export {
  shippingdetails,
  editShippingAddress,
  deleteShippingAddress,
  getShippingDetails,
};
