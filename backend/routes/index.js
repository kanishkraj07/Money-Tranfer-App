const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");
const authRouter = require("./auth");
const session = require("express-session");
const passport = require("passport");
const dotEnv = require("dotenv");
const initializePassport = require("./passport");

const app = express();

dotEnv.config();


app.use(session({
    secret: process.env.SESSION_SECRET_KEY || 'secret-key',
    resave: true,
    saveUninitialized: true
}));

initializePassport();

app.use(passport.initialize());
app.use(passport.authenticate('session'));


const apiRouter = express.Router();

apiRouter.use("/auth", authRouter)

apiRouter.use("/user", userRouter);

apiRouter.use("/account", accountRouter);

module.exports = apiRouter;