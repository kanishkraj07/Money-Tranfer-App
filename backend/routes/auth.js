const express = require("express");
const passport = require("passport");
const  jwt  = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config");

const authRouter = express.Router();

authRouter.get("/google", passport.authenticate('google', {scope: ['profile', 'email']}));
authRouter.get("/github", passport.authenticate('github', {scope: ['user:email' ]}));
authRouter.get("/facebook", passport.authenticate('facebook'));

authRouter.get("/google/callback", passport.authenticate('google', {
    session: false,
    // successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: '/login/failed'
}), (req, res) => {
    console.log(req.user.token);
    res.cookie('token', req.user.token)
    res.redirect('http://localhost:5173/dashboard');
});

authRouter.get("/github/callback", passport.authenticate('github', {
    session: false,
    successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: '/login/failed'
}));

authRouter.get("/facebook/callback", passport.authenticate('facebook', {
    session: false,
    // successRedirect: 'http://localhost:5173/dashboard',
    failureRedirect: '/login/failed'
}), (req, res) => {
    const token = jwt.sign({
        userId: req.user.id
    }, JWT_SECRET_KEY)
    res.cookie('token', token)
    res.redirect('http://localhost:5173/dashboard');
});

module.exports = authRouter;