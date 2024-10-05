import mongoose from 'mongoose';


export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(process.env.mongoConnection);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}