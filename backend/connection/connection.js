import mongoose from "mongoose";

const con = async()=>{
    try{
        await mongoose.connect(process.env.URI);
        console.log("connected to db");
    }catch(err){
        console.log(err);
    }
}

con();