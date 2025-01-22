const User = require('../model/user');

async function handleUserSignUp (req, res) {
    const { name, email, password } = req.body;
    console.log(req.body);
    await User.create({
        name,
        email,
        password
    });
    return res.render("homePage");
}

module.exports = {
    handleUserSignUp,
}