import { combineReducers } from 'redux'
import { CREATE_POST, DELETE_POST, CREATE_COMMENT, DELETE_COMMENT } from '../actions'

function post (state = {}, action) {
    const { post } = action;

    switch (action.type) {
        case CREATE_POST :
            return {
                ...state,
                [post.id]: post
            };
        case DELETE_POST :
            return {
                ...state,
                [post.id]: null
            }
        default :
            return state;
    }
}

function comment (state = {}, action) {
    const { comment } = action;

    switch (action.type) {
        case CREATE_COMMENT :
            return {
                ...state,
                [comment.id]: comment
            };
        case DELETE_COMMENT :
            return {
                ...state,
                [comment.id]: null
            };
        default :
            return state; 
    }
}

export default combineReducers({
    post,
    comment
})