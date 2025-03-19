

const adminMiddleware = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(400).json({ message: "Access denied. Admins only" })
        }

        next()
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message })
    }
}


module.exports = adminMiddleware;