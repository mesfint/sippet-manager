import db from "../db.js";
import bcrypt from 'bcryptjs'

const saltrounds = 10;
//connection string to  remote database which is defined in db.js file
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

userSchema.pre('save', function(next){
  const user = this

  if(this.isModified('password') || this.isNew){
    bcrypt.genSalt(saltrounds, function(saltErr, salt){
      if(saltErr){ return next(saltErr)}else{
        bcrypt.hash(user.password, salt, function(hashError, hash){
          if(hashError) return next(hashError)
          user.password = hash
          next()
        })
      }
    })
  }else {
    return next()
  } 
})

// N.BBB the assigned function should 
// Not be fat arrow function since it has issue regarding using this key word here
//modifyPassword

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if(err){
      return cb(err)
    }
    cb(null, isMatch)
  })
}

export default db.model("User", userSchema);
