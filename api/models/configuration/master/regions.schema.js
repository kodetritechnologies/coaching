import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const regionsSchema = new mongoose.Schema(
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
      ref: "Regions",
      default: null,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Regions",
        default: null,
      },
    ],
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
  { timestamps: true }
);
regionsSchema.plugin(mongoosePaginate);

const Regions = mongoose.model("Regions", regionsSchema);

export default Regions;
