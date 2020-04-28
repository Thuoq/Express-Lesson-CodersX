const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require("../db");


exports.requiredAuth = (req,res,next) => {
	if(!req.cookies.userId) {
		res.redirect("/auth");
		return;
	}
	let idUser = db.get("users").find({idUser: req.cookies.userId * 1}).value();
	if(!idUser){
		res.redirect("/auth");
		return;
	}
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
   			if(result) {
   				res.cookie('userId', userName.idUser)
   				next();
   			}else{
   				res.render("authentication/signin",{
					errors: [
						"Wrong password !"
					]
				})
				return;
   			}
	});
}

exports.isAdmin = (req,res,next) => {
	let idUser  = req.cookies.userId *1;
	let {name,isAdmin} = db.get("users").find({idUser: idUser}).value();
	const trancationUser = db.get("trancations").filter({name: name}).value();
	if(!isAdmin) {
		res.redirect("/trancation");
		res.render("trancations/trancation",{
			trancations: trancationUser
		})
		return; 
	}
	next();
}