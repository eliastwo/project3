const express = require('express');
const path = require('path');
const cookeParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session =require('express-session');
const passport =require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose =require('mongoose');
const index =require('./routes/index');
const users =require('./routes/users');
const http =require('http');
const fs =require('fs');
//const student = require('./routes/student.js');
const config = require('./config/psconnection');
const mongoconfig = require('./config/mongoDBConnection');

/* mongoose.Promise = global.Promise;
mongoose.connect('mongodb://eliastwo:eliastwo1@ds119085.mlab.com:19085/userauthproject3', {
	useMongoClient: true
});
let db = mongoose.connect; */

const app = express();
var PORT = process.env.PORT || 3025;

app.use(express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookeParser());
//app.use('/', student);


app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator());

app.use(flash());

app.use(function(req, res, next){
	res.locals.success_message = req.flash('success_message');
	res.locals.error_message = req.flash('error_message');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
  	next();
});
app.use('/', index);
app.use('/users', users);


app.listen(PORT, function(){
	console.log('Server is running on',PORT);
});
