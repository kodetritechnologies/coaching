import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const coupanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
    },
    code: {
      type: String,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
      },
    ],
    coupan_no: {
      type: String,
    },
    discount_type: {
      type: String,
    },
    min_amount: {
      type: Number,
    },
    max_amount: {
      type: Number,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    type: {
      type: String,
    },
    one_time: {
      type: Boolean,
      default: true,
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

coupanSchema.pre("find", function (next) {
  this.populate("items");
  this.populate("categories");
  next();
});

coupanSchema.pre("findOne", function (next) {
  this.populate("items");
  this.populate("categories");
  next();
});

coupanSchema.plugin(mongoosePaginate);
const Coupan = mongoose.model("Coupan", coupanSchema);
export default Coupan;
