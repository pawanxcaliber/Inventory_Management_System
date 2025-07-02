import mongoose from "mongoose";

export const connectDB= () => {
    try{
         //mongoose.connect('mongodb://127.0.0.1/my_database');
          mongoose.connect(process.env.DB_URL,{dbNAme:process.env.DB_NAME});
          console.log("Database conmection donr!");

    }
    catch(error){
          console.log("connection establishment failed!!");
    }
}