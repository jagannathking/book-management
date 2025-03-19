const express = require('express');
const cors = require('cors');  // Import CORS
const connectData = require('./config/database');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');

const app = express();

// Connect database
connectData();

// Middlewares
app.use(express.json());
app.use(cors()); 

// Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Healthy" });
});

module.exports = app;
