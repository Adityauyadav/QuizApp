import Quiz from '../models/quiz.js';
import Question from '../models/question.js';
import User from '../models/user.js';
import Leaderboard from '../models/leaderboard.js';

export const createQuiz = async (req, res) => {
  try {
    const { quizName } = req.body;
    const existingQuiz = await Quiz.findOne({ quizName });
    if (existingQuiz) {
      return res.status(400).json({ message: "Quiz Name exists" });
    }

    const quiz = new Quiz({ quizName });
    await quiz.save();

    return res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "No questions provided" });
    }

    const createdQuestions = [];

    for (const q of questions) {
      const { question, options } = q;

      if (!question || !options || options.length !== 4) {
        return res.status(400).json({ message: "Invalid question input" });
      }

      const correctCount = options.filter(opt => opt.isCorrect === true).length;
      if (correctCount !== 1) {
        return res.status(400).json({ message: "Each question must have exactly 1 correct option" });
      }

      const newQuestion = new Question({ question, options, quiz:quizId });
      await newQuestion.save();
      createdQuestions.push(newQuestion._id);
    }

    const quiz = await Quiz.findById(quizId);
    quiz.questionsList.push(...createdQuestions);
    await quiz.save();

    res.status(201).json({ message: `${createdQuestions.length} questions added successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getQuiz = async(req,res) =>{
    try {
        const quizList = await Quiz.find().select('quizName');
        const result = quizList.map(q=>({
            quizName : q.quizName,
            quizId : q._id,
        }));
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:"internal error"});
    }
};

export const getQuizbyId = async (req,res) =>{
  try {
    const {quizId} = req.params;
    const response = await Quiz.findById(quizId).populate("questionsList");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
  }
};

export const assignQuiz = async(req,res) => {
  try{
    const {quizId} = req.params;
    const userId = req.body.userId;
    const userCheck = await User.findById(userId);
    if(!userCheck){
      return res.status(500).json({message:"user is not registered"});
    }
    await Quiz.findOneAndUpdate(
      { _id: quizId },
      { $addToSet: { assignedUser: userId } }
    );

    res.status(201).json({message : "user assigned succesfully"});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message:"Internal Server Error"});
  }
};

export const deassignQuiz = async(req,res) => {
  try{
    const {quizId} = req.params;
    const userId = req.body.userId;
    const userCheck = await User.findById(userId);
    if(!userCheck){
      return res.status(500).json({message:"user is not registered"});
    }
    await Quiz.findOneAndUpdate(
      { _id: quizId },
      { $pull: { assignedUser: userId } }
    );

    res.status(200).json({message : "user deassigned successfully"});
  }
  catch(error){
    console.error(error);
    res.status(500).json({message:"Internal Server Error"});
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    await Question.deleteMany({ quizId });
    await Quiz.findByIdAndDelete(quizId);

    return res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const submitQuiz = async (req, res) => {
  try {
    const { quizId, userId } = req.params;
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Invalid answers array" });
    }

    const questions = await Question.find({ quiz: quizId });

    let score = 0;
    const total = questions.length;

    for (const { questionId, selectedOptionId } of answers) {
      const question = questions.find(q => q._id.toString() === questionId);
      if (!question) continue;

      const correctOption = question.options.find(opt => opt.isCorrect);
      if (correctOption && correctOption._id.toString() === selectedOptionId) {
        score++;
      }
    }
    const quiz = await Quiz.findById(quizId);
     if (!quiz.assignedUser.includes(userId)) {
      return res.status(400).json({ message: "User not assigned this quiz" });
    }
    if (quiz.attemptedUser.includes(userId)) {
      return res.status(400).json({ message: "Quiz already attempted" });
    }
    quiz.attemptedUser.push(userId);
    await quiz.save();
    
    await Leaderboard.findOneAndUpdate(
      { user: userId, quizName: quizId },
      { score },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Quiz submitted", score, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};