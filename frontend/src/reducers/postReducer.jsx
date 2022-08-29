/* eslint-disable */
import { DELETE_POST, GET_POSTS, UPDATE_POST_CONTENT, UPDATE_POST_TITLE } from '../actions/postActions'

const initialState = {}

export default function postReducer( state = initialState, action ) {
    switch ( action.type ) {
        case GET_POSTS:
            return action.payload
        case UPDATE_POST_TITLE:
            return state.map( ( post ) => {
                if ( post.id === action.payload.postId ) {
                    return {
                        ...post,
                        title: action.payload.title
                    }
                } else return post
            } )
        case UPDATE_POST_CONTENT:
            return state.map( ( post ) => {
                if ( post.id === action.payload.postId ) {
                    return {
                        ...post,
                        content: action.payload.content
                    }
                } else return post
            } )
        case DELETE_POST:
            return state.filter( ( post ) => post.id !== action.payload.postId )

        default:
            return state
    }
}