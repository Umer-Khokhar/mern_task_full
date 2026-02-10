import express, { json } from "express"
import productRoute from "./src/routes/products.routes.js"
import { connectDB } from "./src/config/db.js"
const app = express()
import cors from "cors"
const port = process.env.PORT || 4000


app.use(json())
app.use(cors())

app.use("/api/products", productRoute)
app.get("/", (req, res) => {
    res.send("App Running")
})




const startServer = async () => {
    try {
        await connectDB()
        app.listen(port, () => {
            console.log("server is listening on the port", port)
        })        
    } catch (error) {
        console.log(error.message)
    }
}
startServer()