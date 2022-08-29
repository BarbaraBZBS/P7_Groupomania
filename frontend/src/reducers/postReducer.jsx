/* eslint-disable */
import { GET_POSTS } from '../actions/postActions'

const initialState = {}

export default function postReducer( state = initialState, action ) {
    switch ( action.type ) {
        case GET_POSTS:
            return action.payload

        default:
            return state
    }
}