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

export const get = (commentId) => 
    fetch(`${api}/comments/${commentId}`, { headers })
        .then(res => res.json())

export const getAll = () =>
    fetch(`${api}/comments`, { headers })
        .then(res => res.json())

export const insert = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: uuid.v1(),
            timestamp: Date.now(),
            body: comment.body,
            author: comment.author,
            parentId: comment.parentId,
            voteScore: 0
        })
    }).then(res => res.json())

export const update = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'PUT',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...comment,
            timestamp: Date.now()
        })
    }).then(res => res.json())

export const remove = (comment) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'DELETE',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())

export const vote = (comment, option) =>
    fetch(`${api}/comments/${comment.id}`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option: option
        })
    }).then(res => res.json())