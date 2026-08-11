import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    type: {
      type: String,
    },
    link: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
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

notificationSchema.plugin(mongoosePaginate);
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
