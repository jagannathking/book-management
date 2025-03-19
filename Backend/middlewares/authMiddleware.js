const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization')

        // authHeader present or not validation
        if (!authHeader || !authHeader.startWith('Bearer ')) {
            return res.status(400).json({ message: "Access denied" })
        }

        // Token
        const token = authHeader.splite(' ')[1];

        // Decode 
        const decode = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decode;
        next();

    } catch (error) {
        res.status(500).json({ message: "Something went wrong, please try again later", error: error.message });
    }
}


module.exports = authMiddleware;

