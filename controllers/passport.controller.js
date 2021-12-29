
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: './config/.env' })

module.exports = async (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' },
        async function (email, password, done) {
            let user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email' });
            }
            let hash = await bcrypt.compare(password, user.password);
            if (!hash) {
                return done(null, false, { message: 'Incorrect password' });
            }
            return done(null, user, { message: 'login success' });
        }
    ));

    // googles
    passport.use(new GoogleStrategy({
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
        async function (request, accessToken, refreshToken, profile, done) {
            let user = await User.findOne({ email: profile.email });
            if (user) {
                return done(null, user);
            }
            let newUser = new User({
                provider: {
                    name: profile.provider,
                    id: profile.id
                },
                email: profile.email,
                username: profile.displayName
            })
            let result = await newUser.save();
            return done(null, result);
        }
    ));

    // facebook
    passport.use(new FacebookStrategy({
        clientID: `${process.env.FACEBOOK_APP_ID}`,
        clientSecret: `${process.env.FACEBOOK_APP_SECRET}`,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        async function (accessToken, refreshToken, profile, done) {
            // console.log(profile)
            let result = await User.findOne({ 'provider.id': profile.id });
            if (result) {
                return done(null, result);
            }
            let newUser = new User({
                provider: {
                    name: profile.provider,
                    id: profile.id
                },
                email: profile.emails[0].value,
                password: '',
                username: profile.displayName
            });
            let user = await newUser.save();
            return done(null, user);
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}