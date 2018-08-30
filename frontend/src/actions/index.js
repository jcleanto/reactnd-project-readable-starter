export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function createPost ({ post }) {
    return {
        type: CREATE_POST,
        post
    }
}

export function deletePost ({ post }) {
    return {
        type: DELETE_POST,
        post
    }
}

export function createComment ({ comment }) {
    return {
        type: CREATE_COMMENT,
        comment
    }
}

export function deleteComment ({ comment }) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}