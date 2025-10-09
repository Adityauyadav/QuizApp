import express from "express";
import {registerUser, loginUser, getUser} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import adminCheck from "../middleware/adminAuth.js";

const router = express.Router();

router.post('/register',registerUser);
router.post("/login", loginUser);
router.get("/verify", protect, (req,res)=>{
    res.status(200).json({success:true})
});
router.get("/all", adminCheck, getUser);

export default router;

