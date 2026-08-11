import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
    },
    message: {
      type: String,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Item",
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

reviewSchema.pre("find", function (next) {
  this.populate("customer");
  this.populate("");
  this.populate("item");
  next();
});
reviewSchema.pre("findOne", function (next) {
  this.populate("customer");
  this.populate("item");
  next();
});

reviewSchema.plugin(mongoosePaginate);
const Review = mongoose.model("Review", reviewSchema);
export default Review;
