const express = require("express");
const router  = express.Router();
const trancationsController = require("../controllers/transcaction.controller");

router.get("/",trancationsController.indexTrancation)

router.get("/create",trancationsController.trancationCreate)

router.post("/create",trancationsController.trancationCreatePost)




module.exports = router;