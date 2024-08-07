const passport = require("passport");
const dotEnv = require("dotenv");
const GoolgeStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook");
const { User, Account } = require("../database/db");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = require("../config");

dotEnv.config();

function initializePassport() {
    const GOOGLE_CLINT_ID = process.env.GOOGLE_CLIENT_ID || 'google-client-id';
    const GOOGLE_CLINET_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'goolge-client-secret';
    const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || 'github-client-id';
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'github-client-secret';
    const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID || 'facebook-client-id';
    const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET || 'facebook-client-secret';
    const REDIRECT_URL = process.env.REDIRECT_URL || '';

    passport.use(new GoolgeStrategy({
        clientID: GOOGLE_CLINT_ID,
        clientSecret: GOOGLE_CLINET_SECRET,
        callbackURL: `${REDIRECT_URL}/google/callback`
    }, async (accessToken, refreshTOken, profile, done) => {
        console.log(profile);
     const user = await User.findOne({username: profile.emails[0]});

    //  if(!user) {
    //     const userId = crypto.randomUUID();
    // await User.create({
    //     userId,
    //     userName: profile.emails[0].value,
    //     firstName: profile.name.givenName,
    //     lastName: profile.name.familyName,
    //     });
    //     await Account.create({
    //         userId,
    //         balance: Math.floor(Math.random() * 10000) + 1
    //         })
    //      done(null, {user, token: '12345566777'})
    //  } else {
    //     done(null, user);
    //  }
    done(null, {name: 'kanishk', token: '12345566777'})

}));

    passport.use(new GithubStrategy({
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: `${REDIRECT_URL}/github/callback`
    }, (accesToken, refreshTOken, profile, done) => {
        console.log(profile);
        done(null, profile)
    }));

    passport.use(new FacebookStrategy({
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: `${REDIRECT_URL}/facebook/callback`
    }, async(accesToken, refreshTOken, profile, done) => {
        console.log(profile);
        const user = await User.findOne({userId: profile.id});

     if(!user) {
        const userId = profile.id;
     await User.create({
        userId,
        userName: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName
        });
    await Account.create({
            userId,
            balance: Math.floor(Math.random() * 10000) + 1
            })
         done(null, profile)
     } else {
        done(null, profile);
     }
    }));
    
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user)
    });
}

module.exports = initializePassport;