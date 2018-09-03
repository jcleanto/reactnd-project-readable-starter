import { combineReducers } from 'redux'
import { REFRESH_CATEGORIES, SAVE_POST, DELETE_POST, REQUEST_POSTS, REFRESH_POSTS, SAVE_COMMENT, DELETE_COMMENT, REFRESH_COMMENTS } from '../constants/ActionTypes'
import _ from 'lodash'

const initialState = {
    categories: [],
    item: {},
    items: [],
    isFetching: false,
    comment: {}
}

function posts (state = initialState, action) {
    const { categories, item, items } = action;

    switch (action.type) {
        case REFRESH_CATEGORIES :
            return {
                ...state,
                categories: categories
            };
        case REQUEST_POSTS :
            return {
                ...state,
                isFetching: true
            };
        case REFRESH_POSTS :
            //recents posts first
            const orderedItems = _.sortBy(items, 'timestamp').reverse();
            return {
                ...state,
                isFetching: false,
                items: orderedItems
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