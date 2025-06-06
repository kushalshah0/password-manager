const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
module.exports = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.send({ success: false, message: 'Please fill all the fields!' });
            }
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success: false, message: 'User not found' });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ success: false, message: 'Invalid password' });
            }
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            if (!token) {
                return res.status(500).json({ success: false, message: 'Token generation failed' });
            }
            user.refreshToken = token;
            await user.save({ validateBeforeSave: true });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ success: true, message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    signupUser: async (req, res) => {
        try {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                res.send({ success: false, message: 'Please fill all the fields!' });
            }
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ success: false, message: 'User already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            if (!token) {
                return res.status(500).json({ success: false, message: 'Token generation failed' });
            }
            newUser.refreshToken = token;
            await newUser.save({ validateBeforeSave: true });
            res.status(201).json({ success: true, message: 'User registered successfully', token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};