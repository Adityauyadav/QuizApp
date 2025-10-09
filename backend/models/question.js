import mongoose from "mongoose";

const questionSchema  = new mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    options : [{
        text : {
            type: String,
            required : true
        },
        isCorrect : {
            type : Boolean,
            required : true
        }

    }],
    quiz : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Quiz",
        required : true,
    }
}, {timestamps: true});


const Question = mongoose.model("Question", questionSchema);

export default Question;