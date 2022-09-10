import axios from '../api/axios'

export const GET_POSTS = 'GET_POSTS'
export const LIKE_POST = 'LIKE_POST'
export const ADD_POST = 'ADD_POST'
export const UPDATE_POST_TITLE = 'UPDATE_POST_TITLE'
export const UPDATE_POST_CONTENT = 'UPDATE_POST_CONTENT'
export const UPDATE_POST_IMAGE = 'UPDATE_POST_IMAGE'
export const DELETE_POST = 'DELETE_POST'
export const GET_POST_ERROR = 'GET_POST_ERROR'
export const GET_IMAGEUPD_ERROR = 'GET_IMAGEUPD_ERROR'

export const getPosts = ( num ) => {
    return ( dispatch ) => {
        return axios
            .get( '/api/posts' )
            .then( ( res ) => {
                const array = res.data.slice( 0, num )
                dispatch( { type: GET_POSTS, payload: array } )
            } )
            .catch( ( error ) => console.log( error ) )
    }
}

export const addPost = ( data ) => {
    return ( dispatch ) => {
        return axios
            .post( '/api/posts', ( data ) )
            .then( ( res ) => {
                // console.log( res.data )
                dispatch( { type: GET_POST_ERROR, payload: '' } )
            } )
            .catch( error => {
                console.log( error )
                dispatch( { type: GET_POST_ERROR, payload: error.response.data.message } )
            } )
    }
}

export const updatePostTitle = ( postId, title ) => {
    return ( dispatch ) => {
        return axios
            .put( `/api/posts/${ postId }`, ( { title } ) )
            .then( ( res ) => {
                dispatch( { type: UPDATE_POST_TITLE, payload: { title, postId } } )
            } )
            .catch( error => console.log( error ) )
    }
}

export const updatePostContent = ( postId, content ) => {
    return ( dispatch ) => {
        return axios
            .put( `/api/posts/${ postId }`, ( { content } ) )
            .then( ( res ) => {
                dispatch( { type: UPDATE_POST_CONTENT, payload: { content, postId } } )
            } )
            .catch( error => console.log( error ) )
    }
}

export const updatePostImage = ( data, id ) => {
    return ( dispatch ) => {
        return axios
            .put( `/api/posts/${ id }`, ( data ) )
            .then( ( res ) => {
                //console.log( res.data )
                dispatch( { type: GET_IMAGEUPD_ERROR, payload: '' } )
            } )
            .catch( ( error ) => {
                console.log( error )
                dispatch( { type: GET_IMAGEUPD_ERROR, payload: error.response.data.message } )
            } )
    }
}

export const likePost = ( postId, userId ) => {
    return ( dispatch ) => {
        return axios
            .post( `/api/posts/${ postId }/like`, ( { userId } ) )
            .then( ( res ) => {
                dispatch( { type: LIKE_POST, payload: { postId, userId } } )
            } )
            .catch( ( error ) => console.log( error ) )
    }
}

export const deletePost = ( postId ) => {
    return ( dispatch ) => {
        return axios
            .delete( `/api/posts/${ postId }` )
            .then( ( res ) => {
                dispatch( { type: DELETE_POST, payload: { postId } } )
            } )
            .catch( error => console.log( error ) )
    }
}