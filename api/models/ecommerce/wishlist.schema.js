import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const wishlistsSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },
    varient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Varient",
      default: null,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

wishlistsSchema.pre("find", function (next) {
  this.populate("customer");
  this.populate("item");
  this.populate("varient_id");
  next();
});
wishlistsSchema.pre("findOne", function (next) {
  this.populate("customer");
  this.populate("item");
  this.populate("varient_id");
  next();
});

wishlistsSchema.plugin(mongoosePaginate);
const Wishlist = mongoose.model("Wishlist", wishlistsSchema);
export default Wishlist;
