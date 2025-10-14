import adminCheck from "../middleware/adminAuth.js";
import { createQuiz, addQuestion, getQuiz, getQuizbyId, assignQuiz, deleteQuiz, submitQuiz } from "../controllers/quizController.js";
import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();


router.post('/create', adminCheck,createQuiz );
router.post('/:quizId/questions', adminCheck, addQuestion);
router.get('/getquiz', protect, getQuiz );
router.get('/:quizId', adminCheck, getQuizbyId );
router.post('/:quizId/assign', adminCheck, assignQuiz);
router.post('/:quizId/deassign', adminCheck, assignQuiz);
router.delete('/:quizId/delete', adminCheck, deleteQuiz);
router.post('/submit/:quizId/:userId', protect, submitQuiz);

export default router;