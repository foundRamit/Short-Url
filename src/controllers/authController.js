require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existing = await User.findOne({ username });

        if (existing) {
            return res.status(400).json({ msg: "username is taken." });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const user = await User.create({ username, password: hashedPass });

        return res.status(201).json({ msg: "user created successfully." });

    } catch (err) {
        console.error("Signup error:", err.message);
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ msg: "user not found." });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: "invalid credentials." });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            msg: "user logged in successfully.",
            token
        });

    } catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};
