import adminCheck from "../middleware/adminAuth.js";
import { createQuiz, addQuestion, getQuiz } from "../controllers/quizController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const app = express();
const router = express.Router();


router.post('/create', adminCheck,createQuiz );
router.post('/:quizId/questions', adminCheck, addQuestion);
router.get('/getQuiz', protect, getQuiz );


export default router;