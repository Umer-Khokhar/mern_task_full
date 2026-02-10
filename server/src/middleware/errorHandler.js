export const errorHandler = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const errMsg = err.message || "Internal server Error"
    res.status(statusCode).json({
        message: errMsg,
        code: statusCode
    })
}