const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    emailAddress : {
        type:String,
        required:true,
        unique:false
    },
    firstName : {
        type:String,
        required:true,
        unique:false
    },
    lastName : {
        type:String,
        required:true,
        unique:false
    },
    message : {
        type:String,
        required:false,
        unique:true
    },
})

const contactus = new  mongoose.model("contactus",contactSchema);

module.exports = contactus
