import mongoose from "mongoose";

export const jobSchema = mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    salary: {
        type:String,
        required:true
    },
    deadline: {
        type:Date,
        required:true
    },
    openings: {
        type:Number,
        required:true
    },
    applicants: [{
        type:mongoose.Types.ObjectId,
        ref:'Applicants'
    }],
    skills:[{
        type:String,
        required:true
    }],
    host:{
        type:mongoose.Types.ObjectId,
        ref:'Recruiter'
    }
})