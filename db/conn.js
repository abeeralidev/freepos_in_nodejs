const mongoose = require("mongoose")
// server db is "mongodb+srv://<username>:<password>@cluster0.o90l7.mongodb.net/freepos?retryWrites=true&w=majority"
mongoose.connect("mongodb://localhost:27017/freepostemptest", {
    // mongoose.connect("mongodb+srv://<username>:<password>@cluster0.o90l7.mongodb.net/freepospktestheuoku?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(() => {
    console.log("connection succesfull")
}).catch((e) => {
    console.log("connections is unscessfull")
})