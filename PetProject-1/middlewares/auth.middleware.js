const bcrypt = require('bcrypt');
const saltRounds = process.env.MY_SLAT_ROUND_PASSWORD *1;
const db = require("../db");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


exports.requiredAuth = (req,res,next) => {
	if(!req.signedCookies.userId) {
		res.redirect("/auth");
		return;
	}
	let idUser = db.get("users").find({
		idUser: req.signedCookies.userId * 1}).value();
	if(!idUser){
		res.redirect("/auth");
		return;
	}
	res.locals.user = idUser;
	next();
}

exports.verifyUser = async (req,res,next) => {
	let{email,name,password} = req.body;
	let userName = db.get("users").find({email: email}).value();
	if(!userName) {
		res.render("authentication/signin",{
			errors: [
				"User does not exits"
			]
		})
		return;
	}
	if(userName.name !== name) {
		res.render("authentication/signin",{
			errors: [
				"User does not exits"
			]
		})
		return;
	}
	let hash = userName.password;
	await bcrypt.compare(password, hash, function(err, result) {
			let errors = ["Wrong password !"];
			let count = userName.isPassword
			if(count >=4) {
				result = false;
				const msg = {
				  to: `${email}`,
				  from: `${process.env.MY_EMAIL_HOST}`,
				  subject: 'SECURITY',
				  text: 'Some one try hack your password',
				  html: '<strong>BE CAREfully</strong>',
				};
				sgMail.send(msg);
				errors[0] = "You have entered too many times";
				res.render("authentication/signin",{
						errors,
				})
				return;
			}else{
				   if(result) {
	   				res.cookie('userId', userName.idUser,{
	   					signed:true
	   				})
	   				next();
	   			}else{
	   				db.update(`users[${userName.idUser -1}].isPassword`, n => n + 1 ).write();
	   				res.render("authentication/signin",{
						errors,
					})
					return;
	   			}
			}	
	});
}

exports.isAdmin = (req,res,next) => {
	let idUser  = req.signedCookies.userId *1;
	let {name,isAdmin} = db.get("users").find({idUser: idUser}).value();
	const trancationUser = db.get("trancations").filter({name: name}).value();
	if(!isAdmin) {		
		res.redirect("/trancation");
		res.render("trancations/trancation",{
			trancations: trancationUser
		})
		return; 
	}
	res.locals.admin = isAdmin;
	next();
}

exports.verifyUserSignUp = async (req,res,next) => {
	const {name,password,confirmPassword,email} = req.body;
	let errors = [];
	// VERIFY_USER_SIGNUP
	if(password !== confirmPassword) {
		errors.push("Don't match password. Please try again");
		
	}
	let isUser = db.get("users").find({name: name}).value();
	if(isUser) {
		errors.push("Users have exits. Please try another nick name!");
	}
	let isEmail = db.get("users").find({email: email}).value();
	if(isEmail) {
		errors.push("Users have exits. Please try another nick name!");
	}
	if(errors.length) {
		res.render('authentication/signup',{
			errors,
		})
		return;
	}
	// SECURITY Create Security PassWord AND STORE IN DATA
	await bcrypt.hash(password, saltRounds, function(err, hash) {
   			 req.body.password = hash;
   			 let newIdUser = db.get("users").value().length + 1;
   			 let newUserSignUp =  Object.assign({},{
   			 		isAdmin:false,
   			 		idUser: newIdUser,
					isPassword:0,
					name,
					password,
					email});
   			 db.get("users").push(newUserSignUp).write();
   			 res.cookie('userId', newIdUser,{
	   					signed:true
	   				})
   			 res.locals.user = name;
   			 next();
	});
}