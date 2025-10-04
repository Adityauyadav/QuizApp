import Quiz from '../models/quiz.js';
import Question from '../models/question.js';

export const createQuiz = async (req, res) => {
  try {
    const { quizName, quizId } = req.body;
    const existingQuiz = await Quiz.findOne({ quizName });
    if (existingQuiz) {
      return res.status(400).json({ message: "Quiz Name exists" });
    }

    const quiz = new Quiz({ quizName, quizId });
    await quiz.save();

    return res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};



export const addQuestion = async(req,res)=>{
    try {
        const {question, options} = req.body;
        const {quizId} = req.params;
    if (!question || !options || options.length !== 4) {
      return res.status(400).json({ message: "Invalid input" });
    };
    const correctCount = options.filter(opt => opt.isCorrect === true).length;
    if(correctCount!=1){
        return res.status(400).json({message:"Only 1 options should be correct"});
    }

    const newQuestion = new Question({question, options, quizId});
    await newQuestion.save();

    const quiz = await Quiz.findOne({quizId});
    quiz.questionsList.push(newQuestion._id);
    await quiz.save();

    res.status(201).json({message:"question added succesfully"});    
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal Server Error"});
    }
};


export const getQuiz = async(req,res) =>{
    try {
        const quizList = await Quiz.find().select('quizName quizId questionsList');
        const result = quizList.map(q=>({
            quizName : q.quizName,
            quizId : q.quizId,
            questionCount : q.questionsList.length,
            questionIDs : q.questionsList
        }));
        return res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message:"internall error"});
    }

};