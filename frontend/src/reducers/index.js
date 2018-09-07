import { combineReducers } from 'redux'
import {
    REFRESH_CATEGORIES,
    SAVE_POST,
    DELETE_POST,
    GET_POST,
    DETAIL_POST,
    VOTE_POST,
    EDIT_POST,
    REQUEST_POSTS,
    REFRESH_POSTS,
    SAVE_COMMENT,
    DELETE_COMMENT,
    GET_COMMENT,
    CLEAR_COMMENT,
    REFRESH_COMMENTS,
    LIST_COMMENTS,
    SORT_POSTS,
    ERROR_PAGE
} from '../constants/ActionTypes'
import _ from 'lodash'

const initialState = {
    categories: [],
    post: {},
    posts: [],
    isFetching: false,
    comment: {},
    category: '',
    comments: [],
    sortBy: 'voteScore'
}

function postsReducer(state = initialState, action) {
    const { categories, post, posts, sortBy } = action;
    switch (action.type) {
        case REFRESH_CATEGORIES:
            return {
                ...state,
                categories: categories.categories
            };
        case REQUEST_POSTS:
            return {
                ...state,
                isFetching: true
            };
        case REFRESH_POSTS:
            return {
                ...state,
                isFetching: false,
                posts: posts,
                sortBy: sortBy
            };
        case SORT_POSTS:
            return {
                ...state,
                posts: posts,
                sortBy: sortBy
            };
        case SAVE_POST:
            return {
                ...state,
                post
            };
        case DELETE_POST:
            return {
                ...state,
                [post.id]: null,
                posts: [ ...state.posts.filter(p => post.id !== p.id) ]
            };
        case GET_POST:
            return {
                ...state,
                post
            };
        case DETAIL_POST:
            return {
                ...state,
                post: { ...post }
            };
        case EDIT_POST:
            return {
                ...state,
                post
            };
        case VOTE_POST:
            return {
                ...state,
                [post.voteScore]: post.voteScore
            };
        case ERROR_PAGE:
            return {
                ...state,
                post
            };
        default:
            return state;
    }
}

function commentsReducer(state = {}, action) {
    const { comment, comments } = action;

    switch (action.type) {
        case SAVE_COMMENT:
            return {
                ...state,
                [comment.id]: comment.id
            };
        case LIST_COMMENTS:
            //more voted first
            const orderedComments = _.sortBy(comments, 'voteScore').reverse();
            return {
                ...state,
                comments: orderedComments
            };
        case REFRESH_COMMENTS:
            let refreshedComments = state.comments.filter(c => c.id !== comment.id);
            refreshedComments = _.sortBy(refreshedComments, 'voteScore').reverse();
            return {
                ...state,
                comments: [...refreshedComments, comment]
            };
        case DELETE_COMMENT:
            return {
                ...state,
                [comment.id]: null,
                comments: [ ...state.comments.filter(c => comment.id !== c.id) ]
            };
        case GET_COMMENT:
            return {
                ...state,
                comment
            };
        case CLEAR_COMMENT:
            return {
                ...state,
                comment: {}
            };
        default:
            return state;
    }
}

export default combineReducers({
    postsReducer,
    commentsReducer
})