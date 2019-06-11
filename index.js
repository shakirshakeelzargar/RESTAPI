var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var employee = require("../RESTAPI/api/employees");

var app = express();



var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Your node js server is running');
});

app.use(cors());
app.use(bodyParser.json());       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/employees",employee);


//if we are here then the specified request is not found


module.exports = app;