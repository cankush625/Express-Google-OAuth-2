const express = require("express");
const passport = require("passport");
const { ensureGuest } = require("../middleware/auth");
const Session = require("express-session");
const router = express.Router();

// @desc Authenticate with the Google OAuth
// @route GET /auth/google
router.get(
    "/google",
    ensureGuest,
    passport.authenticate("google", { scope: ["profile"] }),
);

// @desc Google Auth callback
// @route GET /auth/google/callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/google" }),
    (req, res) => {
        res.redirect("/home");
    },
);

// @desc Logout
// @route GET /auth/logout
router.get("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        }
        return res.redirect("/bye");
    });
});

module.exports = router;
