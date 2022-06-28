import mongoose from "mongoose";

//connect remote database
mongoose.connect(
  process.env.CONNECTION_STRING,
  {},
  (err, data) => {
    if (err) {
      console.log("Not connected");
    } else {
      console.log("Database connected");
    }
  }
);

export default mongoose;
