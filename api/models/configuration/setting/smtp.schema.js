import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const smtpScheam = new mongoose.Schema(
  {
    host: String,
    port: String,
    secure: String,
    user: String,
    pass: String,
    from: String,
    to: String,
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

smtpScheam.plugin(mongoosePaginate);
const Smtp = mongoose.model("Smtp", smtpScheam);
export default Smtp;
