const express = require("express");
const router = express.Router();
const multer  = require('multer')
const upload = multer({dest: './public/uploads/'})
const profileController = require("../controllers/profile.controller");



router
	.get("/",profileController.indexProfile)
router
	.post("/",
		upload.single('avatar'),
		profileController.postEditProfile)

module.exports = router