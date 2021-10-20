const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:false
    },
    questionstring : {
        type:String,
        required:true
    },
})

const questions = new  mongoose.model("Questions",QuestionSchema);

module.exports = questions
