const mongoose = require("mongoose");
let sc = mongoose.Schema;

// Define the Signup Schema with validation
const signupSchema = new sc({
    firstname: {
        type: String,
        required: true,
        trim: true, // Removes leading/trailing spaces
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate usernames
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Ensures password has a minimum length
    },
});

// Model export
var signupmodel = mongoose.model("signups", signupSchema);
module.exports = signupmodel;
