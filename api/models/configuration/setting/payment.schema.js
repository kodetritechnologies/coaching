import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    key_id: {
      type: String,
      unique: true,
    },
    key_secret: {
      type: String,
      unique: true,
    },
    gatway: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
