// middleware/errorMiddleware.js
const routeNotFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.kind === "ObjectId") {
        statusCode = 404;
        message = "Resource not found";
    }

    if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        message = 'Unauthorized';
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};

module.exports = { routeNotFound, errorHandler };
