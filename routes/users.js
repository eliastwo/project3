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

		const dirmyNewProject = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject';
		if(!fs.existsSync(dirmyNewProject)) {fs.mkdirSync(dirmyNewProject)};
		console.log("myNewProject directory created.");

		const fileServerSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/server1.js';
		const fileServerDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/server.js';
		fs.copyFile(fileServerSource, fileServerDest, (err) => {
			if (err) throw err;
			console.log('Server file was successfully copied!');
		});

		const filePackageJSONSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/package.json';
		const filePackageJSONDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/package.json';
		fs.copyFile(filePackageJSONSource, filePackageJSONDest, (err) => {
			if (err) throw err;
			console.log('Package.json file was successfully copied!');
		});

		const dirRoutes = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/routes';
		if(!fs.existsSync(dirRoutes)) {fs.mkdirSync(dirRoutes)};
		console.log("Routes directory created.");

		const fileIndexSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/routes/index.js';
		const fileIndexDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/routes/index.js';
		fs.copyFile(fileIndexSource, fileIndexDest, (err) => {
			if (err) throw err;
			console.log('IndexRoute file was successfully copied!');
		});

		const fileScriptSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/routes/script.js';
		const fileScriptDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/routes/script.js';
		fs.copyFile(fileScriptSource, fileScriptDest, (err) => {
			if (err) throw err;
			console.log('ScriptRoute file was successfully copied!');
		});

		const fileStudentSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/routes/student.js';
		const fileStudentDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/routes/student.js';
		fs.copyFile(fileStudentSource, fileStudentDest, (err) => {
			if (err) throw err;
			console.log('StudentRoute file was successfully copied!');
		});

		const fileUsersSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/routes/user1.js';
		const fileUsersDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/routes/users.js';
		fs.copyFile(fileUsersSource, fileUsersDest, (err) => {
			if (err) throw err;
			console.log('UsersRoute file was successfully copied!');
		});

		const dirConfig = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/config';
		if(!fs.existsSync(dirConfig)) {fs.mkdirSync(dirConfig)};
		console.log("Config directory created.");

		const fileMongoConnSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/config/mongoDBConnection.js';
		const fileMongoConnDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/config/mongoDBConnection.js';
		fs.copyFile(fileMongoConnSource, fileMongoConnDest, (err) => {
			if (err) throw err;
			console.log('MongodbConnection file was successfully copied!');
		});

		const filePsConnSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/config/psconnection.js';
		const filePsConnDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/config/psconnection.js';
		fs.copyFile(filePsConnSource, filePsConnDest, (err) => {
			if (err) throw err;
			console.log('Psconnection file was successfully copied!');
		});

		const dirViews = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views';
		if(!fs.existsSync(dirViews)) {fs.mkdirSync(dirViews)};
		console.log("Views directory created.");

		const dirPages = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views/pages';
		if(!fs.existsSync(dirPages)) {fs.mkdirSync(dirPages)};
		console.log("Pages directory created.");

		const fileIndexEjsSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/views/pages/index.ejs';
		const fileIndexEjsDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views/pages/index.ejs';
		fs.copyFile(fileIndexEjsSource, fileIndexEjsDest, (err) => {
			if (err) throw err;
			console.log('Indexejs file was successfully copied!');
		});

		const fileLoginEjsSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/views/pages/login.ejs';
		const fileLoginEjsDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views/pages/login.ejs';
		fs.copyFile(fileLoginEjsSource, fileLoginEjsDest, (err) => {
			if (err) throw err;
			console.log('Loginejs file was successfully copied!');
		});

		const fileRegisterEjsSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/views/pages/register.ejs';
		const fileRegisterEjsDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views/pages/register.ejs';
		fs.copyFile(fileRegisterEjsSource, fileRegisterEjsDest, (err) => {
			if (err) throw err;
			console.log('Registerejs file was successfully copied!');
		});

		const fileStudentsEjsSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/views/pages/students1.ejs';
		const fileStudentsEjsDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views/pages/students.ejs';
		fs.copyFile(fileStudentsEjsSource, fileStudentsEjsDest, (err) => {
			if (err) throw err;
			console.log('Studentsejs file was successfully copied!');
		});

		const fileUsersEjsSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/views/pages/users.ejs';
		const fileUsersEjsDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views/pages/users.ejs';
		fs.copyFile(fileUsersEjsSource, fileUsersEjsDest, (err) => {
			if (err) throw err;
			console.log('Usersejs file was successfully copied!');
		});

		const dirPartials = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views/partials';
		if(!fs.existsSync(dirPartials)) {fs.mkdirSync(dirPartials)};
		console.log("Partials directory created.");

		const fileHeaderEjsSource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/views/partials/header.ejs';
		const fileHeaderEjsDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/views/partials/header.ejs';
		fs.copyFile(fileHeaderEjsSource, fileHeaderEjsDest, (err) => {
			if (err) throw err;
			console.log('Usersejs file was successfully copied!');
		});

		const dirModels = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/models';
		if(!fs.existsSync(dirModels)) {fs.mkdirSync(dirModels)};
		console.log("Models directory created.");

		const fileMongoDBModelsource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/models/mongodbmodel.js';
		const fileMongodbModelDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/models/mongodbmodel.js';
		fs.copyFile(fileMongoDBModelsource, fileMongodbModelDest, (err) => {
			if (err) throw err;
			console.log('Mongodbmodel file was successfully copied!');
		});

		const fileUserModelsource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/models/User.js';
		const fileUserModelDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/models/User.js';
		fs.copyFile(fileUserModelsource, fileUserModelDest, (err) => {
			if (err) throw err;
			console.log('Usermodel file was successfully copied!');
		});

		const dirPublic = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/public';
		if(!fs.existsSync(dirPublic)) {fs.mkdirSync(dirPublic)};
		console.log("Public directory created.");

		const dirClient = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client';
		if(!fs.existsSync(dirClient)) {fs.mkdirSync(dirClient)};
		console.log("Client directory created.");

		const fileClientPkgJSONsource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/client/package.json';
		const fileClientPkgJSONDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client/package.json';
		fs.copyFile(fileClientPkgJSONsource, fileClientPkgJSONDest, (err) => {
			if (err) throw err;
			console.log('ClientPackageJSON file was successfully copied!');
		});

		const dirClientPublic = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client/public';
		if(!fs.existsSync(dirClientPublic)) {fs.mkdirSync(dirClientPublic)};
		console.log("ClientPublic directory created.");

		const fileClientIndexsource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/client/public/index.html';
		const fileClientIndexDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client/public/index.html';
		fs.copyFile(fileClientIndexsource, fileClientIndexDest, (err) => {
			if (err) throw err;
			console.log('ClientIndexHTML file was successfully copied!');
		});

		
		const dirClientSRC = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client/src';
		if(!fs.existsSync(dirClientSRC)) {fs.mkdirSync(dirClientSRC)};
		console.log("ClientSRC directory created.");

		const fileClientSrcAppCsssource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/client/src/App.css';
		const fileClientSrcAppCssDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client/src/App.css';
		fs.copyFile(fileClientSrcAppCsssource, fileClientSrcAppCssDest, (err) => {
			if (err) throw err;
			console.log('ClientSrcAppCSS file was successfully copied!');
		});

		const fileClientSrcIndexJssource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/client/src/index.js';
		const fileClientSrcIndexJsDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client/src/index.js';
		fs.copyFile(fileClientSrcIndexJssource, fileClientSrcIndexJsDest, (err) => {
			if (err) throw err;
			console.log('ClientSrcIndexJS file was successfully copied!');
		});

		const fileClientSrcIndexCsssource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/client/src/index.css';
		const fileClientSrcIndexCssDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client/src/index.css';
		fs.copyFile(fileClientSrcIndexCsssource, fileClientSrcIndexCssDest, (err) => {
			if (err) throw err;
			console.log('ClientSrcIndexCSS file was successfully copied!');
		});

		const fileClientSrcRoutesJSsource = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/client/src/routes.js';
		const fileClientSrcRoutesJSsDest = '/mnt/c/Users/jeffc/code/NodeJSPassportAuth/myNewProject/client/src/routes.js';
		fs.copyFile(fileClientSrcRoutesJSsource, fileClientSrcRoutesJSsDest, (err) => {
			if (err) throw err;
			console.log('ClientSrcRoutesJS file was successfully copied!');
		});

	
	module.exports = router;



