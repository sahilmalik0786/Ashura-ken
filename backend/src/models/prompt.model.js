import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    tags: {
      type: Array,
    },
    isPublic: Boolean,
  },
  {
    timestamps: true,
  }
);

const promptModel = mongoose.model("prompt", promptSchema);

export default promptModel;
