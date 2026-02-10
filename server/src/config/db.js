import mongoose from "mongoose";
import {config} from "dotenv"
config()

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("successfully connected to db")
        mongoose.connection.on("connected", () => {
            console.log("successfully connected to the database");
        })
        mongoose.connection.on("error", () => {
            console.log("Error while trying to connect to the database")
        })
    } catch (error) {
        console.log(error.message)
    }
}