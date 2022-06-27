import db from "../db.js";
//import bcrypt from 'bcryptjs'
//using passport js
import passportLocalMongoose from 'passport-local-mongoose';
const userSchema = new db.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }, 
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  }
});

/* userSchema.plugin(passportLocalMongoose);
 */
export default db.model("User", userSchema);
