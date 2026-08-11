import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const gallerySchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    gallery: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "File",
        },
        name: {
          type: String,
        },
        desc: {
          type: String,
        },
        link: {
          type: String,
        },
      },
    ],
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

gallerySchema.pre("find", function (next) {
  this.populate("gallery._id");
  next();
});
gallerySchema.pre("findOne", function (next) {
  this.populate("gallery._id");
  next();
});

gallerySchema.plugin(mongoosePaginate);
const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
