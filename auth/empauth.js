var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var _ = require("lodash");
var path = require("path");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var users = [
    {
        id: 1,
        name: process.env.ADMIN_1_USER ,
        password: process.env.ADMIN_1_PASS
    },
    {
        id: 2,
        name: process.env.ADMIN_2_USER,
        password: process.env.ADMIN_2_PASS
    }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'shakirSecretKey';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    // usually this would be a database call:
    var user = users[_.findIndex(users, { id: jwt_payload.id })];
    if (user) {
        next(null, user);
    } else {
        next(null, false);
    }
});

//connecting database

passport.use(strategy);
var obj = express();
obj.use(passport.initialize());
obj.use(methodOverride('_method'));
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
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

obj.post("/", function (req, res) {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }
    // usually this would be a database call:
    var user = users[_.findIndex(users, { name: name })];
    if (!user) {
        res.end("<p><h2>Incorrect Username<h2>");
    }

    if (user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        var payload = { id: user.id };
        console.log(payload)
        // var token = 'BEARER '+jwt.sign(payload, jwtOptions.secretOrKey);
        var token = 'BEARER ' + jwt.sign(payload, jwtOptions.secretOrKey);

        res.end("<p><h2>Successfully Logged In, Kindly Copy your token and goto GET,POST,PUT OR DELETE PAGE.</h2></p>" + '<p>' + token );
    } else {
        res.end("<p><h2>Your password is incorrect");
    }
});



obj.get("/secret", passport.authenticate('jwt', { session: false }), function (req, res) {
    res.json({ message: "Success! You can not see this without a token" });
});

//var server = app.listen(process.env.PORT || 3000, function () {
//console.log('Your node js server is running');
//});


module.exports = {
    method: obj,
    otherMethod: passport.authenticate('jwt', { session: false })
}
