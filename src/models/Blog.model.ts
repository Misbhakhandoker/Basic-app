import mongoose, { Schema } from "mongoose";

export const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    content: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10000,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;
