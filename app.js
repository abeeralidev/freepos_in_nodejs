var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var engine = require("ejs-locals");
var router = express.Router();
require("./db/conn");
var Users = require("./models/user");
var Contact = require("./models/contact");
var questions = require("./models/questions");
var cors = require("cors");
var indexRouter = require("./routes/main/index");
var adminindexRouter = require("./routes/admin/index");
var authapi = require("./routesapi/auth");
var allapi = require("./routesapi/all");
var bodyParser = require("body-parser");
var port = 8016;

var app = express();


app.use(cors({ origin: "http://localhost:4200" }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/auth", authapi);
app.use("/api/all", allapi);

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
app.use("/admin", adminindexRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(errorhandlerr(404));
});

function errorhandlerr(params) {
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


app.listen(process.env.PORT || 8016);
