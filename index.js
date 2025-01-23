const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { connectMongoDb } = require("./connection");
//Routes
const URL = require("./model/userSchema");
const urlRoute = require("./routes/route");  
const staticRoute = require("./routes/staticRouter");
const userRoute = require('./routes/userHandle');
const { restrictToLoggedInUserLogin, checkAuth} = require('./middleware/auth')

const app = express();
const PORT = 8000;

//connection 
connectMongoDb("mongodb://127.0.0.1:27017/Rendering")
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log("Error while connecting Mongodb", err));


//setting the ejs engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.locals.PORT = PORT;
    next();
});

// Routes 
//here the middleware will execute when the user request to the url route
app.use("/url", restrictToLoggedInUserLogin, urlRoute);
app.use('/user',  userRoute);
app.use("/", checkAuth, staticRoute);


app.listen(PORT, () =>{
    console.log(`server started at http://localhost:${PORT}`);
})