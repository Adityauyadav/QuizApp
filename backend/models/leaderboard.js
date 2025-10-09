import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    quizName : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Quiz",
        unique : true
    },
    score : {
        type : Number,
        default : 0,
    }
})

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;