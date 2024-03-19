import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://clase-mongo:clase-mongo@cluster0.phmyc5j.mongodb.net/ToDoApp");
        console.log("=> DB is connected.")
        
    } catch (error) {
        console.log(error);
    }
};

export{
    connectDB
}