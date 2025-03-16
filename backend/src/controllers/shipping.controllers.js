import { Shipping } from "../models/shipping.models.js";

const shippingdetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const { fullname, contact, address } = req.body;
    if (!fullname || !contact || !contact || !address === undefined) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await Shipping.findOne({ userId });
    if (user) {
      return res
        .status(400)
        .json({ message: "User had already registered shipping address" });
    }
    const addAddress = await Shipping.create({
      fullname,
      contact,
      address,
      userId: req.user.id,
    });
    return res
      .status(200)
      .json({ message: "Shipping address added.", data: addAddress });
  } catch (error) {
    return res.status(401).json({
      message: "server error! unable to add shippimg address",
      message: error.message,
    });
  }
};

// edit shipping address


export { shippingdetails };
