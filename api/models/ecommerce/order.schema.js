import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderSchema = new mongoose.Schema(
  {
    order_no: {
      type: String,
    },
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Currency",
      default: null,
    },
    subtotal: {
      type: Number,
    },
    total: {
      type: Number,
    },
    tax: {
      type: Number,
    },
    coupan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupan",
    },
    paymentGatway: {
      type: String,
    },
    transiction_id: {
      type: String,
    },
    payment_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      default: null,
    },
    order_status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
      default: null,
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { strict: false },
  { timestamps: true }
);

orderSchema.pre("find", function (next) {
  this.populate("customer");
  this.populate("currency");
  this.populate("order_status");
  this.populate("payment_status");
  this.populate("items");
  next();
});
orderSchema.pre("findOne", function (next) {
  this.populate("customer");
  this.populate("currency");
  this.populate("order_status");
  this.populate("payment_status");
  this.populate("items");
  next();
});

orderSchema.plugin(mongoosePaginate);
const Order = mongoose.model("Order", orderSchema);
export default Order;
