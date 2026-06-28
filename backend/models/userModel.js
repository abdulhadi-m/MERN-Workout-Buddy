const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

// Static signup method
               // any name
userSchema.statics.signup = async function (email, password){
    const exist = await this.findOne({email})

    if(!email || !password){
        throw Error('Please fill all the mandatory fields!')
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter a valid Email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please enter a strong password')
    }


    if(exist){
        throw Error('Email already exists!');
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password:hash})
    return user
}


// statics login method
userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error('Please fill all the mandatory fields!')
    }

    const user = await this.findOne({email})

    if(!user){
        throw Error('Incorrect Email!');
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user;
}


module.exports = mongoose.model("Users", userSchema)