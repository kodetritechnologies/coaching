import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
    },
    fieldname: {
      type: String,
    },
    encoding: {
      type: String,
    },
    mimetype: {
      type: String,
    },
    url: {
      type: String,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

fileSchema.plugin(mongoosePaginate);
const File = mongoose.model("File", fileSchema);

export default File;
