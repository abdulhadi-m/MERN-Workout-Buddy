const workoutModel = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
exports.getWorkout = async(req,res)=>{
    const user_id = req.user._id
    const workout = await workoutModel.find({user_id}).sort({createdAt: -1})

    if(!workout){
        return res.status(404).json({error: "No Workout Found"})
    }
    res.status(200).json(workout)
}

// create a workout
exports.createWorkout = async(req,res)=>{
    

    const {title, reps, load} = req.body;

// this is my code 
    const emptyFields = [];
    if (!title) {
    emptyFields.push('Title')
    }
    if (!load) {
    emptyFields.push('Load')
    }
    if (!reps) {
    emptyFields.push('Reps')
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please all the mandatory fields!', emptyFields})
    }
    
    try {
        const user_id = req.user._id

        const workout = await workoutModel.create({title, reps, load, user_id});
        res.status(201).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    

}

// get a single workout
exports.singleWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No workout found'})
    }
    const workout = await workoutModel.findById(id)

    if(!workout){
        return res.status(404).json({error: `No workout found for ID: ${id}`})
    }
    res.status(201).json(workout);
}

// deleting workout
exports.deleteWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No workout found'})
    }

                                        // Mongoose require {_id:id} for using findOneAndDelete
                                        // Otherwise use findByIdAndDelete
    const deleteWorkout = await workoutModel.findByIdAndDelete(id)

    if(!deleteWorkout){
        return res.status(404).json({error: "Workout does not exist"})
    }
    res.status(200).json(deleteWorkout)
}

// updating workout
exports.updateWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No workout found'})
    }

    if(!req.body || Object.keys(req.body).length ===0){
        return res.status(400).json({error: "Please provide the content."
        })
    }

    // const updateWorkout = await workoutModel.findOneAndUpdate(
    // {_id: id},                   //  Gotta pass the {_id:id}
    //     {...req.body},
    //     {new:true}
    // )

    const updateWorkout = await workoutModel.findByIdAndUpdate(id, req.body ,{new:true})

    if(!updateWorkout){
        return res.status(404).json({error: "Workout not found"})
    }
    res.status(200).json(updateWorkout)

}
