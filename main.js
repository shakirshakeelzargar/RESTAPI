var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var employee = require("./controllers/employee-controller");
var login = require("../RESTAPI/auth/empauth").method

var app = express();
//var empauth=require("./auth/empauth").method



var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Your node js server is running');
});

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/employee", employee);
app.use("/login", login)
//app.use("/auth/",empauth)
//app.use("/home",empauth)