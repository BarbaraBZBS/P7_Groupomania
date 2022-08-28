import axios from '../api/axios'

export const GET_USER = 'GET_USER'
export const UPDATE_NAME = 'UPDATE_NAME'

export const getUser = ( uid ) => {
    return ( dispatch ) => {
        return axios
            .get( `/api/auth/user/${ uid }` )
            .then( ( res ) => {
                dispatch( { type: GET_USER, payload: res.data } )
            } )
            .catch( ( err ) => console.error( err ) )
    }
}

export const updateName = ( userId, username ) => {
    return ( dispatch ) => {
        return axios
            .put( '/api/auth/user/' + userId, ( { username } ) )
            .then( ( res ) => {
                dispatch( { type: UPDATE_NAME, payload: username } )
                console.log( username )
            } )
            .catch( error => console.log( error ) )
    }
}