const express = require("express");
const router  = express.Router();
const db = require("../db");
const storeTranscaction = db.get("trancations").value();
const storeBooks = db.get("books").value();
const storeUsers = db.get("users").value();
router.get("/",(req,res) => {
	const trancations = [].concat(storeTranscaction);
	res.render("trancations/trancation",{
		trancations,
	})
})
router.get("/create",(req,res) => {
	res.render("trancations/createTrancation",{
		users:storeUsers,
		books:storeBooks
	})
})
router.post("/create",(req,res) => {
	const match = {...req.body};
	const idTranscation = storeTranscaction.length + 1;
	const newTrancation = Object.assign({},{idTranscation: idTranscation},{match});
	console.log(newTrancation)
	db.get("trancations").push(newTrancation).write();
	res.redirect("/");

})



module.exports = router;