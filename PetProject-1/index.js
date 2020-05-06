require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user.router");
const bookRouter  = require("./routers/book.router");
const cookieParser = require('cookie-parser');

const trancationRouter = require("./routers/transcaction.router");
const authRouter = require("./routers/auth.router");
const profileRouter = require("./routers/profile.router");
const middlewareSession = require("./middlewares/session.middleware");
const middlewareUser = require("./middlewares/auth.middleware");

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET_KEY))

app.use(middlewareSession);
app.get("/",(req,res) => {
	res.render("layout")
})
app.
	use("/users",
	middlewareUser.requiredAuth,
	middlewareUser.isAdmin,
	userRouter);
app.
	use("/books",
	bookRouter);
app.
	use("/trancation",
	middlewareUser.requiredAuth,
	trancationRouter);
app.
	use("/auth",
	authRouter)
app.
	use("/profile",
		middlewareUser.requiredAuth,
		profileRouter
		)
app.listen(process.env.PORT ,(req,res)=> {
	console.log("Server is Runing on PORT: ",process.env.PORT)
})
