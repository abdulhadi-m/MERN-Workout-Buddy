import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'



function WorkoutForm() {
    const {dispatch} = useWorkoutsContext()

    const {user} = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!user){
            setError('User must be logged in!')
            return
        }

        const workout = {title, load, reps}
        const response = await fetch(process.env.REACT_APP_API_URL +'/api/workouts',{
            method: 'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields || [])
        }
        else{
            setError(null)
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            console.log('New Workout Added: ', json);

            dispatch({type: 'CREATE_WORKOUT', payload:json})
        }
    }
  return (
    <form className='form' onSubmit={handleSubmit}>
            <div>
            <h3>Add a new workout</h3>

            <label>Exercise title: </label>
            <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)}
            className={emptyFields.includes('Title') ? 'error':''}/>

            <label>Load (in KGs): </label>
            <input type='number' value={load} onChange={(e)=> setLoad(e.target.value)} 
            className={emptyFields.includes('Load') ? 'error':''}/>

            <label>Reps: </label>
            <input type='number' value={reps} onChange={(e)=> setReps(e.target.value)} 
            className={emptyFields.includes('Reps') ? 'error':''}/>

            <button>Add Workout</button>
            {error && <div className='error'>{error}</div>}
        </div>
    </form>
  )
}

export default WorkoutForm