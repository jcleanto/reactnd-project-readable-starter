import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Row,
    Col,
    ButtonGroup,
    Button,
    Form,
    FormGroup,
    Input,
    Card,
    CardBody,
    CardHeader,
    Badge
} from 'reactstrap'
import { getComment, saveComment, voteComment } from '../actions'

class FormComment extends Component {

    static commentInstance = {
        author: '',
        body: '',
        voteScore: 0,
        parentId: '',
        timestamp: Date.now(),
        deleted: false,
        parentDeleted: false
    }

    state = {
        commentToSave: {
            ...FormComment.commentInstance,
            'parentId': this.props.post.id,
            ...this.props.comment
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSaveComment({
            ...this.state.commentToSave,
            'parentId': this.props.post.id
        });
        //console.log({ 
        //    ...this.state.commentToSave
        //})
        //if (this.props.onCreateContact)
        //    this.props.onCreateContact(values)
    }

    handleClearForm = (e) => {
        e.preventDefault();
        this.setState({
            commentToSave: { ...FormComment.commentInstance }
        });
    }

    handleEditComment = (comment) => {
        this.props.onEditComment(comment);
        this.setState({
            commentToSave: comment
        });
    }

    handleClickVoteComment = (comment, post, option) => {
        this.props.onClickVoteComment(comment, post, option);
    }

    onInputChange = (input) => {
        this.setState({
            commentToSave: { ...this.state.commentToSave, ...input }
        });
    }

    render() {
        const { post, comments, history } = this.props
        const { commentToSave } = this.state

        return (
            <div>
                <Card>
                    <CardHeader>Add or Edit a Comment</CardHeader>
                    <CardBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={commentToSave && commentToSave.author}
                                    placeholder="Author"
                                    onChange={(e) => this.onInputChange({ author: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    value={commentToSave && commentToSave.body}
                                    placeholder="Text"
                                    onChange={(e) => this.onInputChange({ body: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary">Submit</Button>
                                {'  '}
                                <Button color="primary" onClick={(e) => this.handleClearForm(e)}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
                <br />
                {comments && comments.map((comment, index) => (
                    <div className="media-body" key={index}>
                        <Row>
                            <Col xs="6">
                                <h5>{comment.author}</h5>
                                <p>{comment.body}</p>
                            </Col>
                            <Col xs="3">
                                Vote Score: <Badge color="primary">{comment.voteScore}</Badge>
                            </Col>
                            <Col xs="3">
                                <ButtonGroup>
                                    <Button size="sm" onClick={() => this.handleEditComment(comment)}>
                                        Edit
                                    </Button>
                                    <Button size="sm" onClick={() => this.handleClickVoteComment(comment, post, 'upVote')}>
                                        Upvote
                                    </Button>
                                    <Button size="sm" onClick={() => this.handleClickVoteComment(comment, post, 'downVote')}>
                                        Downvote
                                    </Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </div>
                ))}
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
        onEditComment: (comment) => dispatch(getComment(comment)),
        onSaveComment: (comment) => dispatch(saveComment(comment)),
        onClickVoteComment: (comment, post, option) => dispatch(voteComment(comment, post, option)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormComment))