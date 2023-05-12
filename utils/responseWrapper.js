const success = (statusCode, message) => {
    return {
        status: "ok",
        statusCode,
        message
    }
}
const error = (statusCode, message) => {
    return {
        status: "error",
        statusCode,
        message
    }
}

module.exports = {
    error, success
}