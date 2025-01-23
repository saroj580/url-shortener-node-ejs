const { getUser } = require('../service/auth')
async function restrictToLoggedInUserLogin(req, res, next) {
    const userUid = req.cookies?.uid;
    console.log("User UID from cookies:", userUid);
    if (!userUid) return res.redirect('/login');
    const user = getUser(userUid);
    console.log("User retrieved from session:", user); 
    if (!user) return res.redirect('/login');
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUserLogin,
    checkAuth,
}