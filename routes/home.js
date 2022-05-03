const express = require("express");
const router = express.Router();

// middlewares
const {ensureAuth, ensureGuest} = require("../middleware/auth");

// @desc Home page
// @route GET /home
router.get("/", ensureAuth, (req, res) => {
    return res.status(200).send("Home Page");
});

module.exports = router;
