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

export const getAll = () =>
    fetch(`${api}/posts`, { headers })
        .then(res => res.json())

export const insert = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            id: 1,
            timestamp: Date.now(),
            title: post.title,
            body: post.body,
            author: post.author,
            category: post.category
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
            title: post.title,
            body: post.body
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

export const vote = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post })
    }).then(res => res.json())

export const getComments = (post) =>
    fetch(`${api}/posts/${post.id}/comments`, { headers })
        .then(res => res.json())