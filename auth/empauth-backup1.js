

var pool= require("../database/mysql")
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
        secret: 1,
        username: 'shakir@northside.in',
        password: 'shakir123'
    },
    {
        secret: 2,
        username: 'test',
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

obj.post("/", function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var secret=1
	if (username && password) {
		pool.query('SELECT * FROM shakir_admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
                var user = users[_.findIndex(users, { username: username })];

                var payload = { id: user.id };
                console.log(payload)
                console.log(user)
                // var token = 'BEARER '+jwt.sign(payload, jwtOptions.secretOrKey);
                var token = 'BEARER ' + jwt.sign(payload, jwtOptions.secretOrKey);
        
                response.send("<p><h2>Successfully Logged In, Kindly Copy your token</h2></p>" + '<p>' + token );
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			
		});
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

