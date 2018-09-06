import uuid from 'uuid'

const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';

// Generate a unique token for storing data on the backend server.
let token = localStorage.token
if (!token)
    token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
    'Accept': 'application/json',
    'Authorization': token
}

export const get = (postId) =>
    fetch(`${api}/posts/${postId}`, { headers })
        .then(res => res.json())
        .catch((error) => ({ networkError: error }))

export const getAll = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

export const getAllCategories = () =>
    fetch(`${api}/categories`, { headers })
        .then(res => res.json())

export const getAllPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
        .then(res => res.json())

export const insert = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...post,
            id: uuid.v1(),
            timestamp: Date.now(),
            voteScore: 0
        })
    }).then(res => res.json())

export const update = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...post,
            timestamp: Date.now(),
            voteScore: 0
        })
    }).then(res => res.json())

export const remove = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

export const vote = (post, option) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: option
        })
    }).then(res => res.json())

export const getComments = (post) =>
    fetch(`${api}/posts/${post.id}/comments`, { headers })
        .then(res => res.json())