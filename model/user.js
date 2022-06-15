import db from "../db.js";

//connect remote database
//import mongoose from 'mongoose'
/* mongoose
  .connect(
    "mongodb+srv://user:user@cluster0.oeybl.mongodb.net/users?retryWrites=true&w=majority"
  ,{},(err, data) => {
    if(err){
      console.log('Not connected')
    }else{
      console.log('Database connected')
    }
  })
 */

const userSchema = new db.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

export default db.model("User", userSchema);
