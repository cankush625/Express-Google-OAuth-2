module.exports = {
    ensureAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect("/auth/google");
    },
    ensureGuest: (req, res, next) => {
        if (req.isAuthenticated()) {
            return res.redirect("/home");
        }
        return next();
    },
};
