import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const NavigationItemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  children: {
    type: Array, // Could be recursive structure, keeping it simple as Array for dynamic Nestable lists
    default: [],
  },
});

const NavigationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // E.g., 'Main Header', 'Footer Menu'
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },
    items: {
      type: [mongoose.Schema.Types.Mixed], // Mixed because items can be deeply nested via react-nestable
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

NavigationSchema.plugin(mongoosePaginate);
const Navigation = mongoose.model("Navigation", NavigationSchema);

export default Navigation;
