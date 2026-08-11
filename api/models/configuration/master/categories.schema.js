import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const categoriesSchema = new mongoose.Schema(
  {
    name: String,
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: String,
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      default: null,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        default: null,
      },
    ],
    featured_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

categoriesSchema.pre("find", function (next) {
  // this.populate("parent");
  this.populate("children");
  this.populate("featured_image");
  next();
});
categoriesSchema.pre("findOne", function (next) {
  // this.populate("parent");
  this.populate("children");
  this.populate("featured_image");
  next();
});

categoriesSchema.plugin(mongoosePaginate);

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
