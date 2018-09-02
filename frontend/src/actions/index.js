import { SAVE_POST, DELETE_POST, REQUEST_POSTS, REFRESH_POSTS, SAVE_COMMENT, DELETE_COMMENT} from '../constants/ActionTypes'
import uuid from 'uuid'
import * as PostsAPI from '../utils/PostsAPI'

function requestPosts () {
    return {
        type: REQUEST_POSTS
    }
}

export function listPosts () {
    return dispatch => {
        dispatch(requestPosts());
        PostsAPI.getAll().then((items) => {
            items.map((items) => {
                dispatch({ type: REFRESH_POSTS, items})
            });
        });
    }
}

export function savePost (post) {
    //let errors = [];
    //let postInstance = { ...post }
    return {
        type: SAVE_POST,
        post
    }
}

export function deletePost (post) {
    return {
        type: DELETE_POST,
        post: { ...post }
    }
}

export function saveComment ({ comment }) {
    return {
        type: SAVE_COMMENT,
        comment
    }
}

export function deleteComment ({ comment }) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}