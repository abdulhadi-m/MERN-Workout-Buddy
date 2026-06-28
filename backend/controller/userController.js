const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

const { loginUser, signupUser } = require('../controller/userController')

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login
exports.loginUser = async(req,res)=>{
    const {email, password} = req.body
    try {
        const user = await User.login(email, password)

        // create token
        const token = createToken(user._id)

                                    // changed this to token
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// signup
exports.signupUser = async(req,res)=>{

    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)

        // create token
        const token = createToken(user._id)

                                    // changed this to token
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}