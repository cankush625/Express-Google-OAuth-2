const express = require("express");
const router = express.Router();

// middlewares
const {ensureAuth, ensureGuest} = require("../middleware/auth");

// @desc Bye page
// @route GET /bye
router.get("/", ensureGuest, (req, res) => {
    return res.status(200).send("Bye");
});

module.exports = router;
