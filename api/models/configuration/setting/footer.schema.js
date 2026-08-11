import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
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

const Footer = mongoose.model("Footer", footerSchema);
export default Footer;