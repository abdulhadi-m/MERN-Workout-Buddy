const mongoose = require('mongoose')

const structure = mongoose.Schema

const workoutStructure = new structure({
    title:{
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load:{
        type: Number,
        required: true
    },
    user_id: {
        type: String, 
        required: true
    }
},{timestamps:true})

module.exports = mongoose.model("Workout", workoutStructure)