import express from "express";
import {registerUser, loginUser} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import { success } from "zod";

const router = express.Router();

router.post('/register',registerUser);
router.post("/login", loginUser);
router.post("/create", protect);

router.get("/verify", protect, (req,res)=>{
    res.status(200).json({success:true})
});

export default router;

