const express = require("express");
const path = require("path");
const { connectMongoDb } = require("./connection");
const URL = require("./model/userSchema"); 
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8000;

//importing
const urlRoute = require("./routes/route");  // No curly braces

//connection 
connectMongoDb("mongodb://127.0.0.1:27017/Rendering")
    .then(() => console.log("MongoDb connected"))
    .catch((err) => console.log("Error while connecting Mongodb", err));


//setting the ejs engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes 
app.use("/url", urlRoute);

app.use("/", staticRoute);

app.listen(PORT, () =>{
    console.log(`server started at http://localhost:${PORT}`);
})