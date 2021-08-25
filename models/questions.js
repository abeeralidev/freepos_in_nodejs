const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    confirmPassword : {
        type:String,
        required:true
    },
    termsCheckbox : {
        type:String,
        required:false
    },
})

const Questions = new  mongoose.model("Questions",QuestionSchema);

module.exports = Questions
