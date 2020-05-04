const db = require("../db");
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'cownut', 
  api_key: '874837483274837', 
  api_secret: process.env.SECRET_KEY_CLOUDINARY, 
});
exports.indexProfile = (req,res)=> {
	let {userId} = req.signedCookies;
	let inFormationUser = db.get("users").find({idUser: parseInt(userId) }).value();
	res.render("profile/profile",{
		inFormationUser,
		srcImg: inFormationUser.avatar
	})
} 

exports.postEditProfile = (req,res) => {
	let {userId} = req.signedCookies;
	const{email, name } = req.body;
	let inFormationUser = db.get("users").find({idUser: userId * 1}).value();
	if(!req.file){
		db.get("users").find({idUser: parseInt(userId)}).assign({
		email,
		name,
		}).write();
			res.render("profile/profile",{
			inFormationUser,
			sucess: true
		})
		return;
	}else{
		let {file:{path: avatar}} = req;
		let newAvatar = avatar.split("\\").slice(1).join('/');
		db.get("users").find({idUser: parseInt(userId)}).assign({
		email,
		name,
		avatar:newAvatar
		}).write();
			res.render("profile/profile",{
			inFormationUser,
			srcImg: newAvatar,
			sucess: true
		})
		return;
	}

	
}