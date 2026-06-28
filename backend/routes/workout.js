const express = require('express')
const workoutModel = require('../models/workoutModel')
const {getWorkout, singleWorkout, createWorkout, deleteWorkout, updateWorkout} = require('../controller/workoutController')
const requireAuth = require('../middleware/requireAuth')


const routerr = express.Router()

// requireAuth for all workout routes
routerr.use(requireAuth)

/**
 * Route: /api/workouts/
 * Method: GET
 * Description: Get all workouts
 * Access: public
 * Parameters: None
 */
routerr.get('/', getWorkout)

/**
 * Route: /api/workouts/:id
 * Method: GET
 * Description: Get all workouts
 * Access: public
 * Parameters: id
 */
routerr.get('/:id', singleWorkout)

/**
 * Route: /api/workouts/
 * Method: POST
 * Description: Create a new workout
 * Access: public
 * Parameters: None
 */
// routerr.post('/',async(req,res)=>{
//     const {title, reps, load } = req.body
    
//     try {
//         const workout = await workoutModel.create({title, reps, load})
//         res.status(200).json(workout)
//     } catch (error) {
//         res.status(400).json({error: error.message})
//     }
// })
routerr.post('/', createWorkout)

/**
 * Route: /api/workouts/:id
 * Method: DELETE
 * Description: Get all workouts
 * Access: public
 * Parameters: id
 */
routerr.delete('/:id', deleteWorkout)

/**
 * Route: /api/workouts/:id
 * Method: PATCH
 * Description: Update a workout
 * Access: public
 * Parameters: id
 */
routerr.patch('/:id', updateWorkout)

module.exports = routerr