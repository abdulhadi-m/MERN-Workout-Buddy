// import React, { useEffect, useState } from 'react'
import React, { useEffect } from 'react'

// component 
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import {useAuthContext} from '../hooks/useAuthContext'
function Home() {

  // useState
  // const [workouts, setWorkout] = useState(null)

  const {workouts, dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()

  useEffect(()=>{
    const fetchWorkouts = async ()=>{
      const response = await fetch(process.env.REACT_APP_API_URL +'/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
      if(response.ok){
        // setWorkout(json)

        dispatch({
          type: 'SET_WORKOUT', payload: json
        })
      }
    }
    if(user){
      fetchWorkouts()
    }

              // now user will also be dependency (auth)
  },[dispatch, user]) //Passing dependency -> dispatch

  return (
    <div className='home'>
      <div>
          {
            workouts && workouts.map((workout)=>(
              //  <p key={workout._id}>{workout.title}</p>
             <WorkoutDetails key={workout._id} workout={workout}/>
            ))
          }
      </div>

      <WorkoutForm/>
    </div>
  )
}

export default Home