import express from "express";
// import notes from "./data/notes";
// import notes from "./data/notes.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
const app=express();
dotenv.config()
connectDB();
app.use(express.json());
app.get('/',(request,response)=>{
    response.send("Api is running");
})



app.use('/api/users',userRoutes);
app.use("/api/notes", noteRoutes);

app.use(notFound);
app.use(errorHandler);
const port=process.env.PORT||5000;
app.listen(port,console.log(`connected to port number ${port}`));