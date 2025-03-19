const express = require('express');
const { createUser, loginUser, userDetails } = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/authMiddleware')

// Routes
const router = express.Router();


router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/user-details/:id", authMiddleware, userDetails);

module.exports = router