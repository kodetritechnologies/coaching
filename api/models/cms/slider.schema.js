import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const sliderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    gallery: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "File",
        },
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

sliderSchema.pre("find", function (next) {
  this.populate("gallery._id");
  next();
});
sliderSchema.pre("findOne", function (next) {
  this.populate("gallery._id");
  next();
});

sliderSchema.plugin(mongoosePaginate);
const Slider = mongoose.model("Slider", sliderSchema);
export default Slider;
