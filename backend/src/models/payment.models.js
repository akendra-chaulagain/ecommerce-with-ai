import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    payerId: { type: String, required: true },
    paymentMethod: { type: String, required: true }, // PayPal
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, required: true }, // "COMPLETED", "PENDING", "FAILED"
    create_time: { type: Date, required: true },
    update_time: { type: Date },
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", PaymentSchema);
