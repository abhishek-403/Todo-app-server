const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
const Users = require("../models/Users");

module.exports = async (req, res, next) => {
    try {
        if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            return res.send(error(401, "Access token required"))
        }


        const accessToken = req.headers.authorization.split(" ")[1];

        const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY)

        req._id = verify._id;
        const curUser = await Users.findById(req._id)
        if (!curUser) {
            return res.send(error(404, "User not found for given token"))
        }
        next();


    } catch (e) {
        return res.send(error(401, "Invalid access token"))

    }

}