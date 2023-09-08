const errorMiddleware = (err, req, res, next) => {
    const defaultError = {
        statusCode: 404,
        success: "failed",
        message: err,
    };

    if (err?.name === "ValidationError") {
        defaultError.statusCode = 400; // Change status code for validation error
        defaultError.message = Object.values(err.errors)
            .map((el) => el.message)
            .join(", ");
    }

    // Handle duplicate key errors (e.g., MongoDB duplicate key errors)
    if (err.code && err.code === 11000) {
        defaultError.statusCode = 400; // Change status code for duplicate key error
        defaultError.message = `${Object.keys(err.keyPattern)} field has to be unique!`;
    }

    res.status(defaultError.statusCode).json({
        success: defaultError.success,
        message: defaultError.message,
    });
};


export default errorMiddleware;
