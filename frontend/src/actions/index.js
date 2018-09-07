import {
    REFRESH_CATEGORIES,
    SAVE_POST,
    DELETE_POST,
    DETAIL_POST,
    GET_POST,
    EDIT_POST,
    REQUEST_POSTS,
    SORT_POSTS,
    REFRESH_POSTS,
    SAVE_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT,
    LIST_COMMENTS,
    REFRESH_COMMENTS,
    GET_COMMENT,
    CLEAR_COMMENT,
    ERROR_PAGE
} from '../constants/ActionTypes'
import * as PostsAPI from '../utils/PostsAPI'
import * as CommentsAPI from '../utils/CommentsAPI'
import _ from 'lodash'

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

export function listPosts(sortBy) {
    let sortedPosts = [];
    return dispatch => {
        dispatch(requestPosts());
        PostsAPI.getAll().then((posts) => {
            sortedPosts = _.sortBy(posts, sortBy).reverse();
            dispatch({ type: REFRESH_POSTS, posts: sortedPosts });
        });
    }
}

export function sortBy(posts) {
    return dispatch => {
        dispatch({ type: SORT_POSTS, posts });
    }
}

export function listPostsByCategory(category, history) {
    return dispatch => {
        dispatch(requestPosts());
        PostsAPI.getAllPostsByCategory(category).then((posts) => {
            dispatch({ type: REFRESH_POSTS, posts });
        });
        if (history) history.push(`/${category}`);
    }
}

export function savePost(post, history) {
    return dispatch => {
        if (post.id !== undefined) {
            PostsAPI.update(post).then((post) => {
                dispatch({ type: SAVE_POST, post: post});
            });
        } else {
            PostsAPI.insert(post).then((post) => {
                dispatch({ type: SAVE_POST, post: post});
            });
        }
        if (history) history.goBack();
    }
}

export function deletePost(post, history) {
    return dispatch => {
        PostsAPI.remove(post).then((post) => {
            dispatch({ type: DELETE_POST, post: { ...post } });
            if (history) history.push('/');
        });
    }
}

export function getPost(postId, history) {
    return dispatch => {
        PostsAPI.get(postId).then((post) => {
            if (post.error === undefined) {
                //dispatch({ type: GET_POST, post });
                PostsAPI.getComments(post).then((comments) => {
                    dispatch({ type: GET_POST, post });
                    dispatch({ type: LIST_COMMENTS, comments });
                    if (history) history.push(`/${post.category}/${postId}`);
                });
            } else {
                dispatch({ type: ERROR_PAGE, post });
                if (history) history.push('/error/page');
            }
        });
    }
}

export function detailPost(post, history) {
    return dispatch => {
        dispatch({ type: DETAIL_POST, post });
        if (history) history.push(`/${post.category}/${post.id}`);
    }
}

export function editPost(post, history) {
    return dispatch => {
        dispatch({ type: EDIT_POST, post });
        if (history) history.push(`/posts/edit/${post.id}`);
    }
}

export function votePost(post, option, from) {
    return dispatch => {
        PostsAPI.vote(post, option).then((post) => {
            if (from === 'list') dispatch(listPosts());
            else dispatch(getPost(post.id));
        });
    }
}

export function saveComment(comment) {
    return dispatch => {
        if (comment.id !== undefined) {
            CommentsAPI.update(comment).then((comment) => {
                dispatch({ type: SAVE_COMMENT, comment });
                dispatch({ type: REFRESH_COMMENTS, comment });
            });
        } else {
            CommentsAPI.insert(comment).then((comment) => {
                dispatch({ type: SAVE_COMMENT, comment });
                dispatch({ type: REFRESH_COMMENTS, comment });
            });
        }
    }
}

export function deleteComment(comment) {
    return dispatch => {
        CommentsAPI.remove(comment).then((comment) => {
            dispatch({ type: DELETE_COMMENT, comment: { ...comment } });
        });
    }
}

export function getComment(comment) {
    return dispatch => {
        if (comment !== null) {
            CommentsAPI.get(comment.id).then((comment) => {
                dispatch({ type: GET_COMMENT, comment });
            });
        } else {
            dispatch({ type: CLEAR_COMMENT });
        }
    }
}

export function voteComment(comment, post, option) {
    return dispatch => {
        CommentsAPI.vote(comment, option).then((comment) => {
            dispatch({ type: VOTE_COMMENT, comment });
            PostsAPI.getComments(post).then((comments) => {
                dispatch({ type: LIST_COMMENTS, comments });
            });
        });
    }
}