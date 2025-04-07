import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderId: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Shipping" },

    orderStatus: {
      type: String,
      enum: ["Pending", "Approved", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Approved", "Cancelled"],
      default: "Pending",
    },
    deliveryDate: { type: Date, default: Date.now },

    transactionId: { type: String },
    taxAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);
// Set deliveryDate to 4 days after the order is created
orderSchema.pre("save", function (next) {
  if (!this.orderDate) {
    this.deliveryDate = new Date(this.orderDate);
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 4); // 4 days after order creation
  }
  next();
});
export const Order = mongoose.model("Order", orderSchema); // Exporting the model
