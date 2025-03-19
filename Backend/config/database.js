const mongoose = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()

const connectData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully ");
    } catch (error) {
        console.error("MongoDB Connection Failed ", error);
    }
};

module.exports = connectData;
