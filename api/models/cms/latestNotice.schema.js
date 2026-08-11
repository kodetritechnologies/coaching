import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const latestNoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      default: null,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      default: "latest_notice",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

latestNoticeSchema.pre("find", function (next) {
  this.populate("category");
  next();
});

latestNoticeSchema.pre("findOne", function (next) {
  this.populate("category");
  next();
});

latestNoticeSchema.plugin(mongoosePaginate);
const LatestNotice = mongoose.model("LatestNotice", latestNoticeSchema);
export default LatestNotice;
