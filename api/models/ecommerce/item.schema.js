import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    short_content: {
      type: String,
    },
    long_content: {
      type: String,
    },
    varients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Varient",
      },
    ],
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
    faqs: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faq",
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brands",
    },
    tages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tages",
      },
    ],
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
      },
    ],
    featured_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    publish: {
      type: Date,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    hot: {
      type: Boolean,
      default: false,
    },
    tranding: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "simple",
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
  { timestamps: true },
);

itemSchema.pre("find", function (next) {
  this.populate("varients");
  this.populate("faqs");
  this.populate("brand");
  this.populate("tages");
  this.populate("categories");
  this.populate("featured_image");
  this.populate("gallery");
  next();
});

itemSchema.pre("findOne", function (next) {
  this.populate("varients");
  this.populate("faqs");
  this.populate("brand");
  this.populate("tages");
  this.populate("categories");
  this.populate("featured_image");
  this.populate("gallery");
  next();
});

itemSchema.plugin(mongoosePaginate);
const Item = mongoose.model("Item", itemSchema);
export default Item;
