import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{console.log("DB Connected Successfully")})
.catch((err)=>{
    console.error("Error Occured",err);
    process.exit(1);
});