var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var engine = require("ejs-locals");
var router = express.Router();
require("./db/conn");
const Users = require("./models/user");
const Contact = require("./models/contact");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

var indexRouter = require("./routes/main/index");
var adminindexRouter = require("./routes/admin/index");

const port = 8016;

var app = express();

// view engine setup
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// app.use('/download', downloadRouter);
// app.use('/forum', forumRouter);
// app.use('/team', teamRouter);
// app.use('/users', usersRouter);
// app.use('/contact', contactRouter);
// app.use('/services', servicesRouter);
// app.use('/about', aboutRouter);

app.use("/admin", adminindexRouter);








// user registerration
app.post("/signup", async (req, res) => {
  try {
    var u = await Users.findOne({
      email: req.body.email,
    });
    if (u) {
      res.send("Email already exists");
    } else {
      const registeruser = new Users({
        email: req.body.email,
        password: req.body.password,
        createdDate: new Date(),
        lastlogindate: new Date(),
        role: "user",
      });

      //password hash

      // middleware concept

      const token = await registeruser.generateAuthToken();
      console.log(token)
      console.log("fuck everything");
      

      console.log("done");
      const registerd = await registeruser.save();
    }

    console.log("inproess");
    // res.status(201).send(req.body)
    // res.send(req.body);

    res.render("main/account/logedin/account-overview");
    // console.log("inproess");
    // res.status(201).render(adminindexRouter)
    // res.render(indexRouter)
    // res.send("userregisterd")
    console.log("registerd");
  } catch (error) {
    res.status(400);
  }
});















//contact us
app.post("/contactus", async (req, res) => {
  try {
    const contactus = new Contact({
      emailAddress: req.body.emailAddress,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      message: req.body.message,
    });
    console.log("done");
    const contacted = await contactus.save();
    console.log("inproess");
    res.status(201).send(req.body);
    // res.render(indexRouter)
    // res.send("userregisterd")
    // app.use('/admin')
    // console.log('registerd')
    res.send(res.body);
  } catch (error) {
    res.status(400);
  }
});













// login method
app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    console.log(`${email} and password id ${password}`);

    const useremail = await Users.findOne({ email: email });

    if(email=="admin@admin.com"){
      const isMatch = await bcrypt.compare(password,useremail.password)

      if (isMatch==true) {
        res.status(201).render("admin/index")
  
      } else {
        res.send("Email or Password is invalid");
      }
    }
    else{
      
      const isMatch = await bcrypt.compare(password,useremail.password)
      
      // Users.findOne({password:password})
      // res.send(useremail.password)
      console.log(isMatch);
      console.log(useremail);
      
      if (isMatch==true) {
        res.status(201).render("main/account/logedin/account-overview")
        
      } else {
        res.send("Email or Password is invalid");
      }
    }
  } catch (error) {
    res.status(400).send("Email or Password is invalid");
  }
});












// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(aaaaaaa(404));
});





function aaaaaaa(params) {
  router.get("", function (req, res, next) {
    res.render("main/index", { title: "Express" });
  });
}









// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});








module.exports = app;

dbsetting();
async function dbsetting() {
  var adminuser = await Users.findOne({
    email: "admin@admin.com",
    role: "admin",
  });
  if (!adminuser) {
    await Users.create({
      createdDate: new Date(),
      email: "admin@admin.com",
      lastlogindate: new Date(),
      password: "admin@123",
      role: "admin",
    });
  }
  var sampleuser = await Users.findOne({
    email: "user@user.com",
    role: "user",
  });
  if (!sampleuser) {
    await Users.create({
      createdDate: new Date(),
      email: "user@user.com",
      lastlogindate: new Date(),
      password: "user@123",
      role: "user",
    });
  }
}









// const securePassword = async (password) =>{
//   const passwordHash= await  bcrypt.hash(password, 10)
//   console.log(passwordHash)
//   const passwordaaa= await  bcrypt.compare('hasnat123', passwordHash)
//   console.log(passwordaaa)
// }

// securePassword("hasnat123")











// const createToken = async() =>{
//   const token = await jwt.sign({_id:"61255a328303d514ccf91b5c"},"hasnat")
//   console.log(token)
// }


// createToken()






app.listen(process.env.PORT || 8016);
console.log("Server is running at http://localhost:8016");
