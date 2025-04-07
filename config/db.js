const mongoose= require('mongoose');
const colors=require('colors');

//connect database
 const connectDB=async () =>{
    try{
     await mongoose.connect(process.env.MONGO_URL)
     console.log(`connected to database ${mongoose.connection.host}`.bgWhite)
    }catch(error){
        console.log("DB error",error);
        
    }
};
module.exports=connectDB;