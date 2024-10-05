import mongoose from "mongoose";

export const applicantSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        required:true
    }
})
