class ErrorHandler extends Error{

    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.StatusCode = err.StatusCode || 500;

    return res.status(err.StatusCode).json({
        success: false,
        message: err.message,
    })
};

export default ErrorHandler;