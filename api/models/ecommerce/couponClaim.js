import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const CoupanClaimSchema = new mongoose.Schema(
  {
    coupanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupan",
      required: true,
    },
    couponCode: {
      type: String,
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

CoupanClaimSchema.pre("find", function (next) {
  this.populate("coupanId");
  this.populate("customer");
  this.populate("");
  next();
});

CoupanClaimSchema.pre("findOne", function (next) {
  this.populate("coupanId");
  this.populate("customer");
  this.populate("");
  next();
});

CoupanClaimSchema.plugin(mongoosePaginate);
const CoupanClaim = mongoose.model("CoupanClaim", CoupanClaimSchema);
export default CoupanClaim;
