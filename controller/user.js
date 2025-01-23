const {v4 : uuidv4 } = require('uuid')
const User = require('../model/user');
const { setUser } = require('../service/auth');
async function handleUserSignUp (req, res) {
    const { name, email, password } = req.body;
    console.log(req.body);
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}

async function handleUserLogin (req, res) {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({
        email,
        password
    });
    if (!user) return res.render('login', {
        error : "Invalid email or password",
    })
    const sessionId = uuidv4();
    console.log("Session ID generated:", sessionId); // Debugging
    console.log("User being set in session:", user);
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/");
}
module.exports = {
    handleUserSignUp,
    handleUserLogin,
}