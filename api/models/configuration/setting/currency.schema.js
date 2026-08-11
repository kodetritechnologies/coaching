import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const currencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    symbol: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      default: "INR",
    },
    is_default: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

currencySchema.plugin(mongoosePaginate);

const Currency = mongoose.model("Currency", currencySchema);
export default Currency;
