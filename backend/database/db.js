const mongoose = require("mongoose");
const jwt  = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config");

mongoose.connect("mongodb+srv://kanishkyagami:kqwfamRmgIv50e83@paytm.3ekhzlh.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    }, 
    
    firstName: {
        type: String,
        maxLength: 15,
        lowerCase: true,
        trim: true
    },
    lastName:  {
        type: String,
        maxLength: 15,
        lowerCase: true,
        trim: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    provider: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        require: true,
        default: 0
    }
});

userSchema.methods.generateToken = (userId) => {
return jwt.sign({
    userId,
    JWT_SECRET_KEY
});
}

const User = mongoose.model("Users", userSchema);
const Account = mongoose.model("Accounts", accountSchema);

module.exports = {
    User,
    Account
};



