import mongoose from "mongoose";
//connect remote database
mongoose
  .connect(
    "mongodb+srv://user:user@cluster0.oeybl.mongodb.net/snippets?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("database connected");
  });

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
