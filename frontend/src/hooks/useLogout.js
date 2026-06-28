import { useAuthContext } from './useAuthContext'
import {useWorkoutsContext} from './useWorkoutsContext'

export const useLogout=()=>{
    const {dispatch} = useAuthContext()
    const {dispatch: workoutsDispatch} = useWorkoutsContext()
    const logout =()=>{
        // remove use from localstorage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUT', payload: null})
    }
    return {logout}
}
