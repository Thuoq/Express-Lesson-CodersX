const express = require('express');
const router = express.Router();
const controller = require("../controllers/auth.controller");
const middlewareUser = require("../middlewares/auth.middleware")
router.
	get("/",
	controller.authSignIn)
	
router.
	post("/",
	middlewareUser.verifyUser,
	controller.authSignInPost)
	
router.
	get("/signout",controller.authSignOut)
	
module.exports =  router;