import app from "./index.js";
import { connectUsingMongoose } from "./src/config/mongodb.js";

app.listen(3000,()=>{
    console.log("Server started at port 3000");
    connectUsingMongoose();
})