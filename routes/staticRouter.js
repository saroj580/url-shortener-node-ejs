//satic router is used to represent the front page of the browser
const express = require("express");
const router = express.Router()
const URL = require("../model/userSchema");

router.get('/', async (req, res) => {
    if (!req.user) return res.redirect("/login")
    console.log("Logged-in user ID:", req.user._id);
    const allurls = await URL.find({ createdBy: req.user._id, });
    console.log("URLs fetched from DB:", allurls);
    console.log('All URLs: ', allurls);
    return res.render('homePage', {
        urls : allurls,
    });
})

router.get('/signup', (req, res) => {
    return res.render("signup");
})
router.get('/login', (req, res) => {
    return res.render("login");
})
module.exports = router;