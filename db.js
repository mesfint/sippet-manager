import mongoose from 'mongoose'

//connect remote database
mongoose
  .connect(
    "mongodb+srv://user:user@cluster0.oeybl.mongodb.net/snippets?retryWrites=true&w=majority"
  ,{},(err, data) => {
    if(err){
      console.log('Not connected')
    }else{
      console.log('Database connected')
    }
  })

  export default mongoose