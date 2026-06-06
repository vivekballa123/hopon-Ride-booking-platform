import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./db/db.js";
import userRoutes from "./routes/user.routes.js"

dotenv.config();

connectDB()

const app = express()
//Middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>{
    res.send("hello worlds")
})
app.use("/users",userRoutes)
//port
const PORT  = process.env.PORT || 5000


//starting server

app.listen(PORT,()=>{
    console.log(`server is starting on port ${PORT}`)
})