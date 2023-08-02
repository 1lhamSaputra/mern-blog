require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

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
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour in milliseconds
        });
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
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000, // 1 hour in milliseconds
        });
        res.json({ user: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error })
    }

}

// User Logout
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error })
    }

}

// Check if the user is logged in
exports.checkLogin = async (req, res) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization header missing or invalid' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.json({ isLoggedIn: false });
        }

        jwt.verify(token, process.env.SECRET_KEY, (error, decode) => {
            if (error) {
                return res.status(403).json({ message: 'Token verification failed' });
            }

            return res.json({ isLoggedIn: true });
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error })
    }
}