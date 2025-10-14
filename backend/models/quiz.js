import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizName : {
        type : String,
        required : true,
    },
    questionsList : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question"
    }],
    assignedUser : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],
    attemptedUser : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }],


});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;