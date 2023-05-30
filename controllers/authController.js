const { success, error } = require("../utils/responseWrapper");
const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginController = async (req, res) => {
    try {

        const { password, email } = req.body;

        if (!password || !email) {
            return res.send(error(403, "All fields required"))
        }

        const curUser = await User.findOne({ email }).select('+password');
        if (!curUser) {
            return res.send(error(404, "User not found"))
        }

        const unhashedPassword = await bcrypt.compare(password, curUser.password)

        if (!unhashedPassword) {
            return res.send(error(409, "Incorrect password"))
        }

        const accessToken = createAccessToken({ _id: curUser._id })
        const refreshToken = createRefreshToken({ _id: curUser._id })

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })

        return res.send(success(200, { accessToken }))
    } catch (e) {
        return res.send(error(500, e.message))
    }


}

const signupController = async (req, res) => {
    try {

        const { password, email, name } = req.body;

        if (!password || !email || !name) {
            return res.send(error(403, "All fields required"))
        }

        const check = await User.findOne({ email })

        if (check) {
            return res.send(error(409, "User already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 7)

        const curUser = await User.create({
            name, email,password: hashedPassword
        })

        const accessToken = createAccessToken({ _id: curUser._id })
        const refreshToken = createRefreshToken({ _id: curUser._id })

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true
        })


        return res.send(success(201, { accessToken }))
    } catch (e) {
        return res.send(error(500, e.message))

    }

}

const logOutController = async (req,res)=>{
    try {

        res.clearCookie('jwt',{
            httpOnly:true,
            secure:true
        })
        return res.send(success(200,'User logged out'))
        
    } catch (e) {
        return res.send(error(500,e.message))

        
    } 
}


const refreshAccessToken = async (req, res) => {
    try {
        const cookie = req.cookies;
        if (!cookie.jwt) {
            return res.send(error(401, "Refresh Token required"))
        }

        const token = cookie.jwt

        const decode = jwt.verify(token,
            process.env.REFRESH_TOKEN_KEY);

        const _id = decode._id;

        const accessToken = createAccessToken({ _id });

        return res.send(success(200, { accessToken }))

    } catch (e) {
        return res.send(error(500, e.message))
    }
}



function createAccessToken(body) {

    try {

        const accessToken = jwt.sign(body, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: '1d'
        })
        return accessToken


    } catch (e) {


    }

}
function createRefreshToken(body) {

    try {

        const refreshToken = jwt.sign(body, process.env.REFRESH_TOKEN_KEY, {
            expiresIn: '1y'
        })
        return refreshToken


    } catch (e) {

    }

}







module.exports = {
    loginController,
    signupController,
    refreshAccessToken,
    logOutController
}