// that ==> express (just changed the name)
const that = require('express')

// Importing user controller
const { loginUser, signupUser } = require('../controller/userController')

// way ==> router (just changed the name)
const way = that.Router()

// Login route
way.post('/login', loginUser)

// sign up route
way.post('/signup', signupUser)



module.exports = way