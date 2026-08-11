import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const cartSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    variantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Varient",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

cartSchema.pre("find", function (next) {
  this.populate("customer");
  this.populate("");
  this.populate("itemId");
  this.populate("variantId");
  next();
});
cartSchema.pre("findOne", function (next) {
  this.populate("customer");
  this.populate("");
  this.populate("itemId");
  this.populate("variantId");
  next();
});

cartSchema.plugin(mongoosePaginate);
const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
