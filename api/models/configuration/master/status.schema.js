import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const statusSchema = new mongoose.Schema(
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

statusSchema.pre("find", function (next) {
  this.populate("featured_image");
  next();
});
statusSchema.pre("findOne", function (next) {
  this.populate("featured_image");
  next();
});

statusSchema.plugin(mongoosePaginate);

const Status = mongoose.model("Status", statusSchema);

export default Status;
