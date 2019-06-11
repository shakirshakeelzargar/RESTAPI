var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
const methodOverride = require('method-override');
var passport = require("passport");
var passportJWT = require("passport-jwt");
var _ = require("lodash");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var users = [
    {
        id: 1,
        name: 'shakir',
        password: 'shakir'
    },
    {
        id: 2,
        name: 'test',
        password: 'test'
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
    res.json({ message: "Express is up!" });
});

obj.post("/login", function (req, res) {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
    }
    // usually this would be a database call:
    var user = users[_.findIndex(users, { name: name })];
    if (!user) {
        res.status(401).json({ message: "no such user found" });
    }

    if (user.password === req.body.password) {
        // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
        var payload = { id: user.id };
        // var token = 'BEARER '+jwt.sign(payload, jwtOptions.secretOrKey);
        var token = 'BEARER '+jwt.sign(payload, jwtOptions.secretOrKey);

        res.json({ message: "Successfully Logged In", Your_token_is: token });
    } else {
        res.status(401).json({ message: "passwords did not match" });
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