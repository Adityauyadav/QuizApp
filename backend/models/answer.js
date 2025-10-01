import mongoose from "mongoose";

const {ObjectId} = mongoose.Schema.Types

const answerSchema = new mongoose.Schema({
    quizId : {
        type : ObjectId,
        ref : "Quiz",
        required : true
    },
    userId : {
        type : ObjectId,
        ref : "User",
        required : true
    },
    questionId : {
        type : ObjectId,
        ref : "Question",
        required : true
    },
    selectedOption : {
        type : String,
        required : true
    },
    isCorrect : {
        type : Boolean,
        required : true
    }

});

const Answer = mongoose.model("Answer", answerSchema);
export default Answer;