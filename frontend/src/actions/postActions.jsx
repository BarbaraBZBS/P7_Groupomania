import axios from '../api/axios'

export const GET_POSTS = 'GET_POSTS'

export const getPosts = () => {
    return ( dispatch ) => {
        return axios
            .get( '/api/posts' )
            .then( ( res ) => {
                dispatch( { type: GET_POSTS, payload: res.data } )
            } )
            .catch( ( error ) => console.log( error ) )
    }
}