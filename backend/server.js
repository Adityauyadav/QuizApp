import "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRouter);


app.listen(PORT, ()=>{
    console.log("Server started at ", PORT);
})