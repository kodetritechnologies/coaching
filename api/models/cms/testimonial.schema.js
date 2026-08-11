import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    title: {
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
    },
    description: {
      type: String,
    },
    featured_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    publish_date: {
      type: Date,
      default: null,
      set: (v) => (v === "null" ? null : v),
    },
    type: {
      type: String,
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

testimonialSchema.pre("find", function (next) {
  this.populate("featured_image");
  next();
});
testimonialSchema.pre("findOne", function (next) {
  this.populate("featured_image");
  next();
});

testimonialSchema.plugin(mongoosePaginate);
const Testimonial = mongoose.model("Testimonial", testimonialSchema);
export default Testimonial;
