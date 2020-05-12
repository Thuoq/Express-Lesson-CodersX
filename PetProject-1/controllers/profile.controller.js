const cloudinary = require('cloudinary').v2;
const Users = require("../models/user.model");
const Trancations = require("../models/trancation.model");
cloudinary.config({ 
  cloud_name: 'cownut', 
  api_key: '874837483274837', 
  api_secret: process.env.SECRET_KEY_CLOUDINARY, 
});
exports.indexProfile = async (req,res)=> {
	let {userId} = req.signedCookies;
	let inFormationUser = await Users.findById(userId);
	res.render("profile/profile",{
		inFormationUser,
		srcImg: inFormationUser.avatar,
		user: inFormationUser
	})
} 

exports.postEditProfile = async (req,res) => {
	let {userId} = req.signedCookies;
	const{email, name } = req.body;
	let inFormationUser = await Users.findById(userId);
	inFormationUser.name = name
	inFormationUser.email = email
	await Trancations.find({idUser: userId}).updateMany({name:name,email:email })
	if(!req.file){
		await Users.findByIdAndUpdate(userId,{email,name})
			res.render("profile/profile",{
			inFormationUser,
			sucess: true
		})
			return;
		
	}else{
		let {file:{path: avatar}} = req;
		let newAvatar = avatar.split("\\").slice(1).join('/');
		inFormationUser.avatar = newAvatar;
		await Users.findByIdAndUpdate(userId,{name,email,avatar: newAvatar})
			res.render("profile/profile",{
			inFormationUser,
			srcImg: newAvatar,
			sucess: true,
			user: inFormationUser
		})
		return;
	}

}