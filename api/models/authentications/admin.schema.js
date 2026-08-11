import mongoose from "mongoose";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-paginate-v2";
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    description: {
      type: String,
    },
    featured_image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
    },
    status: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Status",
    },
    deletedAt: {
      type: Date,
      default: null,
      set: (v) => (v === "null" ? null : v),
    },
  },
  { timestamps: true }
);
adminSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    user.password = hashPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

adminSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

adminSchema.pre("find", function (next) {
  this.populate("featured_image");
  this.populate("status");
  next();
});
adminSchema.pre("findOne", function (next) {
  this.populate("featured_image");
  this.populate("status");
  next();
});

adminSchema.plugin(mongoosePaginate);
const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
