import db from "../db.js";

const snippetSchema = new db.Schema({
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
  snippet: {
    type: String,
    required: true,
  },
});

export default db.model("Snippet", snippetSchema);
