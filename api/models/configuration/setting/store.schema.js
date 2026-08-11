import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    value: {
      type: Object,
      default: {},
    },
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

const Store = mongoose.model("Store", storeSchema);
export default Store;
