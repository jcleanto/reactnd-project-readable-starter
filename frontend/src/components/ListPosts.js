import React from 'react'
import { Row, Col, Badge, Button, ButtonGroup } from 'reactstrap';
import { formatDate, formatHour } from '../utils/helpers'

export const ListPosts = ({ posts, isFetching, history, handleClickPost, handleClickVotePost, handleClickEditPost }) => {
    return (
        <ul>
            {!isFetching && posts !== null &&
                posts.map(post => (
                    <li key={post.id} className="list-post">
                        <h1 className="mt-4">
                            <a href="#" onClick={(event) => handleClickPost(event, post, history)}>{post.title}</a>
                        </h1>
                        <p className="lead">by {post.author}</p>
                        <hr />
                        <Row>
                            <Col xs="7">
                                <Row>
                                    <Col xs="12">
                                        <small>Posted on {formatDate(post.timestamp)} at {formatHour(post.timestamp)}</small>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="5">
                                        <small>Comments:</small> <Badge color="primary">{post.commentCount}</Badge>
                                    </Col>
                                    <Col xs="5">
                                        <small>Vote Score:</small> <Badge color="primary">{post.voteScore}</Badge>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="3">
                                <ButtonGroup>
                                    <Button size="sm" onClick={(event) => handleClickEditPost(event, post, history)}>
                                        Edit
                                    </Button>
                                    <Button size="sm" onClick={(event) => handleClickVotePost(event, post, 'upVote')}>
                                        Delete
                                    </Button>
                                    <Button size="sm" onClick={(event) => handleClickVotePost(event, post, 'upVote')}>
                                        Upvote
                                    </Button>
                                    <Button size="sm" onClick={(event) => handleClickVotePost(event, post, 'downVote')}>
                                        Downvote
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                        <hr />
                    </li>
                ))
            }
        </ul>
    )
}

