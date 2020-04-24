const express = require("express");
const router  = express.Router();
const userController = require("../controllers/user.controller");
router.get("/",userController.indexUser)

router.get("/create",userController.userCreate) 

router.post("/create",userController.userCreatePost)

router.get("/:id/edit",userController.userEdit)

router.post("/:id/edit",userController.userEditPost)

router.get('/:id/delete',userController.userDelete)

module.exports = router