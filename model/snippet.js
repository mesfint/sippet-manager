import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    required: false,
  },
});

export default mongoose.model("Snippet", snippetSchema);
