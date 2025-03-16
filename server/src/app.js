import express from "express";
import cors from "cors";

const app=express();
app.use(cors({
    origin: '*',
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.static("public"))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

//routes import
import newsRouter from "./routes/news.routes.js"

//routes declaration
app.use("/api/v1/news",newsRouter)


export {app};