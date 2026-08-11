import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const tagesSchema = new mongoose.Schema(
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

tagesSchema.pre("find", function (next) {
  this.populate("featured_image");
  next();
});
tagesSchema.pre("findOne", function (next) {
  this.populate("featured_image");
  next();
});

tagesSchema.plugin(mongoosePaginate);

const Tages = mongoose.model("Tages", tagesSchema);

export default Tages;
