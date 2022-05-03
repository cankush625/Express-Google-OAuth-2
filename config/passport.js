const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

// passport argument is a passport argument passed to the passportConf in app.js
// The argument "done" is the callback function
module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
                clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                const newUser = {
                    googleId: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName,
                    image: profile.photos[0].value,
                };

                // Save user data in the database
                try {
                    // Get the user from database. If user not present in the database
                    // then create a new user entry
                    let user = await User.findOne({ googleId: profile.id });
                    if (!user) {
                        user = await User.create(newUser);
                    }
                    done(null, user);
                } catch (err) {
                    console.error(err);
                }
            },
        ),
    );
    // Sessions:
    // On successful authentication, a session will be established and maintained
    // via a cookie set in the user's browser

    // Each subsequent request contains an unique cookie that identifies the session.
    // Inorder to support login sessions, Passport will serialize and deserialize
    // User instances to and from the session

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};
