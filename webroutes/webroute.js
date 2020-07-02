var express = require("express");
var _ = require("lodash");
var path = require("path");
var bodyParser = require("body-parser");


var obj = express();
obj.use(bodyParser.json());       // to support JSON-encoded bodies

obj.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
obj.use(bodyParser.json())

obj.get("/", function (req, res) {
    //res.json({ message: "Express is up!" });
    var rootpath=path.dirname(require.main.filename || process.mainModule.filename);
    res.sendFile(path.join(rootpath + '/weblogin/login.html'));
});


obj.get("/get", function (req, res) {
    //res.json({ message: "Express is up!" });
    var rootpath=path.dirname(require.main.filename || process.mainModule.filename);
    res.sendFile(path.join(rootpath + '/weblogin/get.html'));
});

obj.get("/post", function (req, res) {
    //res.json({ message: "Express is up!" });
    var rootpath=path.dirname(require.main.filename || process.mainModule.filename);
    res.sendFile(path.join(rootpath + '/weblogin/post.html'));
});

obj.get("/put", function (req, res) {
    //res.json({ message: "Express is up!" });
    var rootpath=path.dirname(require.main.filename || process.mainModule.filename);
    res.sendFile(path.join(rootpath + '/weblogin/put.html'));
});


obj.get("/delete", function (req, res) {
    //res.json({ message: "Express is up!" });
    var rootpath=path.dirname(require.main.filename || process.mainModule.filename);
    res.sendFile(path.join(rootpath + '/weblogin/delete.html'));
});




module.exports = {
    method: obj
}