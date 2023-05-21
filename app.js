const PORT = 3000|process.env.PORT;
const express = require("express");
const ejs = require("ejs");
const bodyParser = require('body-parser');
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(session({
    secret:"TASK-USER",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.set("strictQuery",false);
// mongoose.coonect("mongodb://127.0.0.1:27017/taskuserDB");

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

const User = mongoose.model("User",userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(request,response){
    response.render("home");
});

app.listen(PORT, function(err) {
    console.log(err);
});

