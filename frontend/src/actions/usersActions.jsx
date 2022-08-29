import axios from '../api/axios'

export const GET_USERS = 'GET_USERS'

export const getUsers = () => {
    return ( dispatch ) => {
        return axios
            .get( '/api/auth/users' )
            .then( ( res ) => {
                dispatch( { type: GET_USERS, payload: res.data } )
            } )
            .catch( ( error ) => console.log( error ) )
    }
}