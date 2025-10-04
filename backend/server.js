import "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api/users', userRouter);
app.use('/api/admin', quizRoutes);

app.listen(PORT, ()=>{
    console.log("Server started at ", PORT);
})


