import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();
const app = express()
//Middleware

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("hello worlds")
})
//port
const PORT  = process.env.port || 5000


//starting server

app.listen(PORT,()=>{
    console.log(`server is starting on port ${PORT}`)
})