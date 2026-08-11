import mongoose from "mongoose";

const varientSchema = new mongoose.Schema(
  {
    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    value: {
      type: String,
    },
    price: {
      type: Number,
    },
    sale_price: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    quantity: {
      type: String,
      default: "unlimited",
    },
    weight: {
      type: Number,
    },
    dimensions: {
      length: {
        type: Number,
      },
      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
    },
    manufacturing_date: {
      type: Date,
    },
    expire_date: {
      type: Date,
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  },
  { timestamps: true },
);

varientSchema.pre("find", function (next) {
  this.populate("gallery");
  next();
});

varientSchema.pre("findOne", function (next) {
  this.populate("gallery");
  next();
});

const Varient = mongoose.model("Varient", varientSchema);
export default Varient;
