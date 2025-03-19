const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


// create user
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // user input validation
        if (!name || !email || !password || !role) {
            return res.status(404).json({ message: "All fields are requied" })
        }

        //
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists, please login" });
        }

        // hash the password;
        const hashPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            password: hashPassword,
            role: role,
        })

        await newUser.save();

        res.status(201).json({ message: "User created successfully", newUser });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try after some time", error: error.message })
    }
}

// login user
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // validation for user inputs
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        // user already exist or not
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "user not exist, please Register" })
        }

        // decode password
        const isMatch = bcryptjs.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        // Generate token
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: "User logined successfully", token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try after some time", error: error.message })
    }
}

// Get user details
const userDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id); 

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
};
module.exports = { createUser, loginUser, userDetails }