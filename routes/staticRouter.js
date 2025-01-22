//satic router is used to represent the front page of the browser
const express = require("express");
const router = express.Router()
const URL = require("../model/userSchema");

router.get('/', async (req, res) => {
    const allurls = await URL.find({});
    console.log('All URLs: ', allurls);
    return res.render('homePage', {
        urls : allurls,
    });
})

router.get('/signup', (req, res) => {
    return res.render("signup");
})
module.exports = router;