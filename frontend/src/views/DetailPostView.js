import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Row,
    Col,
    Badge,
    Button,
    ButtonGroup
} from 'reactstrap';
import { formatDate, formatHour } from '../utils/helpers'
import { listPosts, listCategories, listPostsByCategory, getPost, votePost, getComment } from '../actions'
import FormComment from '../components/FormComment'

class DetailPostView extends Component {

    componentDidMount() {
        let { post, history } = this.props;
        let postId = this.props.match.params.postId;
        //console.log(this.props.match.params.postId)
        this.props.onGetPost(postId, history);
        //console.log('POST',post)
        //console.log(post)
    }

    handleClickVotePost = (post, option) => {
        this.props.onClickVotePost(post, option);
    }

    render() {
        const { post } = this.props

        return (
            <div>
                <h1 className="mt-4">
                    {post.title}
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
                            <Button size="sm" onClick={(event) => this.handleClickVotePost(event, post, 'upVote')}>
                                Edit
                            </Button>
                            <Button size="sm" onClick={(event) => this.handleClickVotePost(event, post, 'upVote')}>
                                Delete
                            </Button>
                            <Button size="sm" onClick={() => this.handleClickVotePost(post, 'upVote')}>
                                Upvote
                            </Button>
                            <Button size="sm" onClick={() => this.handleClickVotePost(post, 'downVote')}>
                                Downvote
                            </Button>
                        </ButtonGroup>
                    </Col>
                </Row>
                <hr />
                <p>{post.body}</p>
                <hr />
                <FormComment />
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        post: state.postsReducer.post,
        isFetching: state.isFetching,
        comments: state.postsReducer.comments,
        comment: state.commentsReducer.comment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        listPosts: () => dispatch(listPosts()),
        listCategories: () => dispatch(listCategories()),
        onClickCategory: (category, history) => dispatch(listPostsByCategory(category, history)),
        onGetPost: (post, history) => dispatch(getPost(post, history)),
        onClickVotePost: (post, option) => dispatch(votePost(post, option, 'detail')),
        onEditComment: (comment) => dispatch(getComment(comment))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailPostView))