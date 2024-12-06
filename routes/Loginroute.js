const express = require("express");
const app = express.Router();
const UserModel = require("../model/Login"); // Import the shared User model

// Login Route
app.post('/loginview', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check for matching user in the database
        const user = await UserModel.findOne({ username, password });

        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// Signup Route
app.post('/signup', async (req, res) => {
    const { firstname, lastname, username, password } = req.body;

    // Validate input fields
    if (!firstname || !lastname || !username || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    try {
        // Check if the username already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'Username already exists.' });
        }

        // Create a new user
        const newUser = new UserModel({ firstname, lastname, username, password });
        await newUser.save();

        res.status(201).json({ success: true, message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ success: false, message: 'Server error during signup.' });
    }
});

module.exports = app;
