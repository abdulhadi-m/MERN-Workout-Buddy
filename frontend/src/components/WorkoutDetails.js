import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// DATE FNS
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

function WorkoutDetails({workout}) {

  const {dispatch} = useWorkoutsContext()

  const {user} = useAuthContext()

  const handleClick = async()=>{

    if(!user){
      return
    }

    const response = await fetch(process.env.REACT_APP_API_URL +'/api/workouts/'+ workout._id, {

      method: 'DELETE',  
      headers:{'Authorization': `Bearer ${user.token}`}

    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }

  }

  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (in KGs): </strong>{workout.load}</p>
        <p><strong>Reps: </strong>{workout.reps}</p>
        <p> {formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})} </p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>

    </div>
  )
}

export default WorkoutDetails