import axios from '../api/axios'

export const GET_USER = 'GET_USER'
export const UPDATE_NAME = 'UPDATE_NAME'
export const GET_USER_ERROR = 'GET_USER_ERROR'

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
                dispatch( { type: GET_USER_ERROR, payload: '' } )
            } )
            .catch( error => {
                console.log( error )
                dispatch( { type: GET_USER_ERROR, payload: error.response.data.message } )
            } )

    }
}