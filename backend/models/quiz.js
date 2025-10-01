import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    quizName : {
        type : String,
        required : true,
    },
    quizId : {
        type : String,
        required : true,
        unique : true,
    },
    questionsList : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Question"
}]

});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;