require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate Token
const generateToken = (userId) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("Missing SECRET_KEY environment variable.");
    }
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
}

// Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if is user exist
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' })
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Password hash
        const hashedPassword = await bcrypt.hash(password, salt);

        // Store user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // Generate token and sent as respons
        const token = generateToken(savedUser._id);
        res.status(201).json({ user: savedUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error })
    }
}

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'Invalid email' })
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        // Generate token and sent as respons
        const token = generateToken(existingUser._id);
        res.json({ user: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error })
    }

}

// User Logout
exports.logout = async (req, res) => {
    try {
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error })
    }

}