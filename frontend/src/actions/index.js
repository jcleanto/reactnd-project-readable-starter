import {
    REFRESH_CATEGORIES,
    SAVE_POST,
    DELETE_POST,
    REQUEST_POSTS, 
    REFRESH_POSTS, 
    UPVOTE_POST, 
    DOWNVOTE_POST, 
    SAVE_COMMENT, 
    DELETE_COMMENT, 
    UPVOTE_COMMENT, 
    DOWNVOTE_COMMENT
} from '../constants/ActionTypes'
import uuid from 'uuid'
import * as PostsAPI from '../utils/PostsAPI'

export function listCategories() {
    return dispatch => {
        PostsAPI.getAllCategories().then((categories) => {
            dispatch({ type: REFRESH_CATEGORIES, categories });
        });
    }
}

function requestPosts() {
    return {
        type: REQUEST_POSTS
    }
}

export function listPosts() {
    return dispatch => {
        dispatch(requestPosts());
        PostsAPI.getAll().then((items) => {
            dispatch({ type: REFRESH_POSTS, items });
        });
    }
}

export function savePost(post) {
    //let errors = [];
    let postInstance = { ...post };
    if (post.id === null) {
        postInstance.id = uuid.v1();
    }
    postInstance.timestamp = Date.now();
    return {
        type: SAVE_POST,
        postInstance
    }
}

export function deletePost(post) {
    return {
        type: DELETE_POST,
        post: { ...post }
    }
}

export function saveComment({ comment }) {
    return {
        type: SAVE_COMMENT,
        comment
    }
}

export function deleteComment({ comment }) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}