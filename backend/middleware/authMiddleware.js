const authMiddleware = (req, res, next) => {
    //Auth check
    const authToken = req.headers.authorization;
    if (!authToken) {
        return res.status(401).json({message:'Not authorized'});
    }

    // If auth success
    next();
};

module.exports = authMiddleware;