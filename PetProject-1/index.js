const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user.router");
const bookRouter  = require("./routers/book.router");
const trancationRouter = require("./routers/transcaction.router");
const app = express();
app.use(express.static('public'))
app.set('view engine', 'pug')
app.set('views', './views')
const PORT = 9000;
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get("/",(req,res) => {
	res.render("overView")
})


app.use("/users",userRouter);
app.use("/books",bookRouter);
app.use("/trancation",trancationRouter);
app.listen(PORT ,(req,res)=> {
	console.log("Server is Runing on PORT: ",PORT)
})
