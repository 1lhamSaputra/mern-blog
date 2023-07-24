const handleNotFound = (req, res, next) => {
    const error = new Error('Resource not found');
    error.status = 404;
    next(error);
}

const handleErrors = (error, req, res) => {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';

    res.status(status).json({message});
};

module.exports = {
    handleNotFound,
    handleErrors
}
