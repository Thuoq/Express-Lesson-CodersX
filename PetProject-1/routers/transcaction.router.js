const express = require("express");
const router  = express.Router();
const trancationsController = require("../controllers/transcaction.controller");

router.get("/",trancationsController.indexTrancation)

router.get("/create",trancationsController.trancationCreate)

router.post("/create",trancationsController.trancationCreatePost)

router.get("/:id/compelete",trancationsController.transcactionCompelete)



module.exports = router;