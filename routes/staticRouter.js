//satic router is used to represent the front page of the browser
const express = require("express");
const router = express.Router()
const URL = require("../model/userSchema");

router.get('/', async (req, res) => {
    const allurls = await URL.find({});
    return res.render('homePage', {
        urls : allurls,
    });
})

module.exports = router;