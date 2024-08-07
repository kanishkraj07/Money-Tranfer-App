const express = require("express");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();
const {User, Account} = require("../database/db");

const { isUserNotExist, validateUserRegisterInputs, validateUserLoginInputs } = require("../middlewares/user-middlewares");
const JWT_SECRET_KEY = require("../config");
const { AuthMiddleware } = require("../middlewares/auth-middlewares");
const { UPDATE_USER_INFO_SCHEMA } = require("../schemas/user");

userRouter.post("/signup", validateUserRegisterInputs, isUserNotExist , async (req, res) => {
    
    const userId = crypto.randomUUID();
    const token = jwt.sign({
        userId
    }, JWT_SECRET_KEY);

    const hashedPassword =  await bcrypt.hash(req.body.password, 10);

   await User.create({
        userId,
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password:  hashedPassword
    });

    await Account.create({
        userId,
        balance: Math.floor(Math.random() * 10000) + 1
    });

    res.status(200).json({
        message: "User created successfully",
        token
    });
});

userRouter.post('/signin', validateUserLoginInputs, async (req, res) => {
    const user = await User.findOne({userName: req.body.userName});
    if(!user) {
        res.status(411).json({
            message: "incorrect username"
        })
    } else {
        const hasedPassword = user.password;
        const password = req.body.password;
       const isValidUser = await bcrypt.compare(password, hasedPassword);

       if(isValidUser) {
        const token = jwt.sign({
            userId: user.userId
        }, JWT_SECRET_KEY);

        res.status(200).json({
            message: "User Loggedin successfully",
            token
        });
       } else {
        res.status(411).json({
            message: "Error while logging in"
        });
       }
    }
})

userRouter.get("/me", AuthMiddleware, async (req, res) => {
   const userDetails = await User.findOne({userId: req.userId});
   if(userDetails) {
    res.status(200).json({
        user: {
            userName: userDetails.userName,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName
        }
       })
   } else {
    res.status(400).json({
        message: "User not found"
    })
   }
})

userRouter.put("/", AuthMiddleware, async (req, res) => {
    const userInfoBody = req.body;

    if(!UPDATE_USER_INFO_SCHEMA.safeParse(userInfoBody).success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    else {
        if(userInfoBody.password) {
            userInfoBody.password = await bcrypt.hash(userInfoBody.password, 10);
        }
       await User.updateOne({userId: req.userId}, {$set: userInfoBody})
        res.status(200).json({
            message: "Updated Successfully"
        })
}
});

userRouter.get("/bulk", AuthMiddleware, async(req, res) => {
    const filterVal = req.query.filter || "";
   const filteredUsers = await User.find({$or: [{firstName: {$regex: filterVal}}, {lastName: {$regex: filterVal} }]});
   res.status(200).json({
    users: filteredUsers.map(user => {
        return {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName
        }
    })
   });
})

module.exports = userRouter;