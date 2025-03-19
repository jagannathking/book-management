const express = require('express')
const connectData = require('./config/database');
const userRoutes = require('./routes/user.routes')
const bookRoutes = require('./routes/book.routes');

const app = express();

// Connect data base
connectData()


// middlewares
app.use(express.json());


// all Routes
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

// Test Routes
app.get("/", (req, res) => {
    res.status(200).json({message: "Healthy"})
})

module.exports = app;
