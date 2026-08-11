import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const supportTicketSchema = new mongoose.Schema(
  {
    ticket_no: {
      type: String,
    },
    subject: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },
    status: {
      type: String,
      enum: ["open", "close"],
      default: "open",
    },
    message: [
      {
        from: {
          type: String,
          enum: ["customer", "admin", "owner"],
        },
        message: {
          type: String,
        },
        gallery: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "File",
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

supportTicketSchema.pre(["find", "findOne"], function (next) {
  this.populate("customer")
    .populate("")
    .populate({
      path: "item",
      populate: {
        path: "featured_image",
        model: "File",
      },
    })
    .populate("message.gallery");

  next();
});

supportTicketSchema.plugin(mongoosePaginate);
const SupportTicket = mongoose.model("SupportTicket", supportTicketSchema);

export default SupportTicket;
