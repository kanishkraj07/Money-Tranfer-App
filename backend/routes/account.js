const express = require("express");
const { AuthMiddleware } = require("../middlewares/auth-middlewares");
const { Account, User } = require("../database/db");
const validateFundtransferBody = require("../middlewares/account-middlewares");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.use(AuthMiddleware);

accountRouter.get("/", async (req, res) => {
    const accountDetails = await Account.findOne({userId: req.userId});
    res.status(200).json({
        balance: accountDetails.balance
    })
})

async function transfer(req) {
    const toUserId = req.body.to;
    const amount = req.body.amount;

   const session = await mongoose.startSession();
   session.startTransaction();

   const fromAccount = await Account.findOne({userId: req.userId})

   if(!fromAccount || amount > fromAccount.balance) {
    await session.abortTransaction();
    await session.endSession();
    res.status(400).json({
        message: "insufficient balance"
    })
    return;
   }

   const toAccount = await Account.findOne({userId: toUserId});

   if(!toAccount) {
    await session.abortTransaction();
    await session.endSession();
    res.status(400).json({
        message: "Invalid account"
    });
    return;
   }


   await Account.updateOne({userId: fromAccount.userId}, {$inc: {balance: -amount}});

   await Account.updateOne({userId: toUserId}, {$inc: {balance: amount}});

   await session.commitTransaction();
   await session.endSession();
   res.status(200).json({
    message: "Fund Transfer Successful"
   });
}


accountRouter.post("/transfer", validateFundtransferBody, async(req, res) => {
    const toUserId = req.body.to;
    const amount = req.body.amount;

   const session = await mongoose.startSession();
   session.startTransaction();

   const fromAccount = await Account.findOne({userId: req.userId})

   if(!fromAccount || amount > fromAccount.balance) {
    await session.abortTransaction();
    await session.endSession();
    res.status(400).json({
        message: "insufficient balance"
    })
    return;
   }

   const toAccount = await Account.findOne({userId: toUserId});

   if(!toAccount) {
    await session.abortTransaction();
    await session.endSession();
    res.status(400).json({
        message: "Invalid account"
    });
    return;
   }


   await Account.updateOne({userId: fromAccount.userId}, {$inc: {balance: -amount}});

   await Account.updateOne({userId: toUserId}, {$inc: {balance: amount}});

   await session.commitTransaction();
   await session.endSession();
   res.status(200).json({
    message: "Fund Transfer Successful"
   });
})
module.exports = accountRouter;