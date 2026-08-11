import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const contactSchema = new mongoose.Schema(
  {
    values: {
      type: mongoose.Schema.Types.Mixed,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    deletedAt: {
      type: Date,
      default: null,
      set: (v) => (v === "null" ? null : v),
    },
  },
  { timestamps: true }
);

contactSchema.pre("find", function (next) {
  this.populate("customer");
  next();
});
contactSchema.pre("findOne", function (next) {
  this.populate("customer");
  next();
});

contactSchema.plugin(mongoosePaginate);
const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
