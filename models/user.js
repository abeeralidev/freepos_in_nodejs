const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const RegisterSchema = new mongoose.Schema({
    
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    termsCheckbox : {
        type:String,
        required:false
    },
    role : {
        type:String,
        required:true,
        default:"user"
    },
    lastlogindate: {
        type: Date,
        required: false,
        default: new Date()
    },
    createddate: {
        type: Date,
        required: false,
        default: new Date()
    },


})

console.log("sss")

RegisterSchema.pre("save", async function(next) {
    if(this.isModified("password")){

        //   const passwordHash= await  bcrypt.hash(password, 10)
        console.log(`this is before ${this.password}`);
        this.password = await bcrypt.hash(this.password,10)
    
        console.log(`this is before ${this.password}`);
    }
    next()
})


const Users = new  mongoose.model("Users",RegisterSchema);

module.exports = Users
