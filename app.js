const express = require("express");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();


app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get("/",function(request,response){
    response.render("partials/header");
});









app.listen(3000);

