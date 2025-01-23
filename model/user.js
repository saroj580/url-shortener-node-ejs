const mongoose = require("mongoose");

const userAuth = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    visitHistory: [{ timestamps: { type: Number } }],
}, { timestamps: true }, 
);

const User = mongoose.model("user", userAuth);

module.exports = User;