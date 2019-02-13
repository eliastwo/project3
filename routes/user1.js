const express = require( 'express');
const { User, Table, createUser, comparePassword, getUserByEmail, getUserById } = require( '../models/User');
const passport = require( 'passport');
const http = require( 'http');
const pg = require( 'pg');
const path = require( 'path');
const fs = require( 'fs');
const bodyParser = require( 'body-parser');
var es2015 = require('babel-preset-es2015');

const router = express.Router();
const pool = require('../config/psconnection.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded( { extended: false } ));

//Variables for getting data = require( main website
let dbName      = '';
let dbLoginName = '';
let dbLoginPswd = '';
let tableName   = 'MYTable4';
let column1Name = 'Table1Column1';
let column2Name = 'Table1Column2';
let isPrimary   = '';
let dataType    = '';
let isNull      = '';

let LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res){
	res.render('pages/users');
});

router.get('/main', function(req, res) {
	// res.json(student);
	res.render('pages/students');
 });

router.get('/register', function(req, res){
  	res.render('pages/register');
});

router.post('/register', function(req, res){
	let name = req.body.name;
	let email = req.body.email;
	let password = req.body.password;
	let cfm_pwd = req.body.cfm_pwd;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Please enter a valid email').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('cfm_pwd', 'Confirm Password is required').notEmpty();
	req.checkBody('cfm_pwd', 'Confirm Password Must Matches With Password').equals(password);

	let errors = req.validationErrors();
	if(errors)
	{
		res.render('pages/register',{errors: errors});
	}
	else
	{
		let user = new User({
		name: name,
		email: email,
		password: password
		});
		createUser(user, function(err, user){
			if(err) throw err;
			else console.log(user);
		});
		req.flash('success_message','You have registered, Now please login');
		res.redirect('login');
	}
});

router.get('/login', function(req, res){
	console.log('client connected to server');
	res.render('pages/login');
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback : true
},
function(req, email, password, done) {
	getUserByEmail(email, function(err, user) {
		if (err) { return done(err); }
			if (!user) {
				return done(null, false, req.flash('error_message', 'No email is found'));
			}
			comparePassword(password, user.password, function(err, isMatch) {
				if (err) { return done(err); }
				if(isMatch){
					return done(null, user, req.flash('success_message', 'You have successfully logged in!!'));
				}
				else{
					return done(null, false, req.flash('error_message', 'Incorrect Password'));
				}
			});
		});
	}
));

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	getUserById(id, function(err, user) {
		done(err, user);
	});
});

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/users/login', failureFlash: true
	}), 
	function(req, res){
		req.flash('success_message', 'You are now Logged in!!');
		res.redirect('/');
	}
);

router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_message', 'You are logged out');
	res.redirect('/users/login');
});

var dbType		      = 'MongoDb';
var viewType	      = 'EJS';

router.post('/api/data', (request, response) => {
    const postBody = request.body;

		var viewType				= postBody.viewType;
		var dbType					= postBody.dbType;
		var dbName          = postBody.dbName;
		var dbLoginName     = postBody.dbLoginName;
		var dbLoginPassword = postBody.dbLoginPassword;
		var t1Name          = postBody.t1Name;
		var column1Name     = postBody.column1Name;
		var column2Name			=	'column2';
		var isPrimary       = postBody.isPrimary;
		var dataType        = postBody.DataType;
		var isNull          = postBody.isNull;

		pool.query("CREATE TABLE IF NOT EXISTS mySchema." + t1Name + "(" + column1Name +  " SERIAL PRIMARY KEY, " + column2Name + " varchar(30), T1Col3 varchar(30))", function(err,res) {
			if(err) { console.log(err); } 
			else { console.log(res); }
		});

		pool.query("SELECT * from mySchema." + t1Name , function(err, res) {
			if(err) { console.log(err); } 
			else { console.log(res); }
		});

	});
	
	module.exports = router;



