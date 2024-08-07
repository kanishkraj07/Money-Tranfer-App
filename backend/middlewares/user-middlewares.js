const {User} = require("../database/db");
const zod = require("zod");
const { USER_SIGN_UP_SCHEMA, USER_SIGN_IN_SCHEMA } = require("../schemas/user");

async function isUserNotExist(req, res, next) {
    const userName = req.body.userName;
    const password = req.body.password;

    const user = await User.findOne({userName, password})

    if(!user) {
        next();
    } else {
        res.status(411).json({
            message: "user already taken"
        })
    }

}

function validateUserRegisterInputs(req, res, next) {
    if(USER_SIGN_UP_SCHEMA.safeParse(req.body).success) {
        next();
    } else {
        res.status(411).json({
            message: "incorrect inputs"
        })
    }
}

function validateUserLoginInputs(req, res, next) {
    if(USER_SIGN_IN_SCHEMA.safeParse(req.body).success) {
        next();
    } else {
        res.status(411).json({
            message: "incorrect user inputs"
        })
    }
}

module.exports = {
    isUserNotExist,
    validateUserRegisterInputs,
    validateUserLoginInputs
};