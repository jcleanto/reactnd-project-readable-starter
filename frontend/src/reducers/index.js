import { combineReducers } from 'redux'
import { SAVE_POST, DELETE_POST, REQUEST_POSTS, REFRESH_POSTS, SAVE_COMMENT, DELETE_COMMENT, REFRESH_COMMENTS } from '../constants/ActionTypes'

const initialState = {
    item: {},
    items: [],
    isFetching: false,
    comment: {}
}

function posts (state = initialState, action) {
    const { item, items } = action;

    switch (action.type) {
        case REQUEST_POSTS :
            return {
                ...state,
                isFetching: true
            };
        case REFRESH_POSTS :
            return {
                ...state,
                isFetching: false,
                items: items
            };
        case SAVE_POST :
            return {
                ...state,
                [item.id]: item
            };
        case DELETE_POST :
            return {
                ...state,
                [item.id]: null
            };
        break;
        default :
            return state;
    }
}

function comments (state = {}, action) {
    const { item } = action;

    switch (action.type) {
        case SAVE_COMMENT :
            return {
                ...state,
                [item.id]: item
            };
        case DELETE_COMMENT :
            return {
                ...state,
                [item.id]: null
            };
        break;
        default :
            return state; 
    }
}

export default combineReducers({
    posts,
    comments
})