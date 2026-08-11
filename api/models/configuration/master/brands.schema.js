import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const brandsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    featured_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
      set: (v) => (v === "null" ? null : v),
    },
  },
  { timestamps: true }
);

brandsSchema.pre("find", function (next) {
  this.populate("featured_image");
  next();
});
brandsSchema.pre("findOne", function (next) {
  this.populate("featured_image");
  next();
});

brandsSchema.plugin(mongoosePaginate);

const Brands = mongoose.model("Brands", brandsSchema);

export default Brands;
