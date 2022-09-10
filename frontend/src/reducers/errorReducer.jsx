/* eslint-disable */
import { GET_IMAGEUPD_ERROR, GET_POST_ERROR } from "../actions/postActions"
import { GET_USER_ERROR } from "../actions/userActions"


const initialState = { userError: [], postError: [] }

export default function errorReducer( state = initialState, action ) {
    switch ( action.type ) {
        case GET_POST_ERROR:
            return {
                postError: action.payload,
                userError: [],
                imageUpdError: []
            }
        case GET_IMAGEUPD_ERROR:
            return {
                imageUpdError: action.payload,
                postError: [],
                userError: []
            }
        case GET_USER_ERROR:
            return {
                userError: action.payload,
                postError: [],
                imageUpdError: []
            }

        default:
            return state
    }
}