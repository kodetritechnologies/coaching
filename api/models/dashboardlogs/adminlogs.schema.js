import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const adminLogsSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    description: {
      type: String,
    },
    browser: {
      type: String,
    },
    browser_version: {
      type: String,
    },
    ip_address: [String],
    os: {
      type: String,
    },
    platform: {
      type: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

adminLogsSchema.plugin(mongoosePaginate);
const AdminLogs = mongoose.model("AdminLogs", adminLogsSchema);
export default AdminLogs;
