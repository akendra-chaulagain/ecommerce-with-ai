import { Shipping } from "../models/shipping.models.js";

const shippingdetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const { fullname, contact, address } = req.body;
    if (!fullname || !contact || !contact || !address === undefined) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const user = await Shipping.findOne({
      userId,
    });
    if (user) {
      return res.status(400).json({
        message: "User had already registered shipping address",
      });
    }
    const addAddress = await Shipping.create({
      fullname,
      contact,
      address,
      userId: req.user.id,
    });
    return res.status(200).json({
      message: "Shipping address added.",
      data: addAddress,
    });
  } catch (error) {
    return res.status(401).json({
      message: "server error! unable to add shippimg address",
      message: error.message,
    });
  }
};

// edit shipping address
const editShippingAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, contact, address } = req.body;
    if (!id) {
      return res.status(401).json({
        message: "server error! unable to find shipping address",
        message: error.message,
      });
    }

    const updatedAddress = await Shipping.findByIdAndUpdate(
      id,
      {
        fullname,
        contact,
        address,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({
      message: "Shipping Address Updated successfully",
      message: updatedAddress,
    });
  } catch (error) {
    return res.status(401).json({
      message: "server error! unable to update shippimg address",
      message: error.message,
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

export { shippingdetails, editShippingAddress, deleteShippingAddress };
