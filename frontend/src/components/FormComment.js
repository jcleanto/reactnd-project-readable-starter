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
import { getComment, saveComment, voteComment, deleteComment } from '../actions'
import { FormErrors } from './FormErrors'

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
        },
        formErrors: { author: '', body: '' },
        authorValid: false,
        bodyValid: false
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let authorValid = this.state.authorValid;
        let bodyValid = this.state.bodyValid;

        switch (fieldName) {
            case 'author':
                authorValid = value.length >= 3;
                fieldValidationErrors.author = authorValid ? '' : ' is too short';
                break;
            case 'body':
                bodyValid = value.length >= 3;
                fieldValidationErrors.body = bodyValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            authorValid: authorValid,
            bodyValid: bodyValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.authorValid && this.state.bodyValid });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSaveComment({
            ...this.state.commentToSave,
            'parentId': this.props.post.id
        });
    }

    handleClearForm = (e) => {
        e.preventDefault();
        this.setState({
            commentToSave: { ...FormComment.commentInstance }
        });
    }

    handleClickEditComment = (comment) => {
        this.props.onEditComment(comment);
        this.setState({
            commentToSave: comment
        });
    }

    handleClickDeleteComment = (comment) => {
        this.props.onClickDeleteComment(comment);
    }

    handleClickVoteComment = (comment, post, option) => {
        this.props.onClickVoteComment(comment, post, option);
    }

    onInputChange = (e, input) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            commentToSave: { ...this.state.commentToSave, ...input }
        }, () => { this.validateField(name, value) });
    }

    render() {
        const { post, comments } = this.props
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
                                    name="author"
                                    value={commentToSave && commentToSave.author}
                                    placeholder="Author"
                                    onChange={(e) => this.onInputChange(e, { author: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    name="body"
                                    value={commentToSave && commentToSave.body}
                                    placeholder="Text"
                                    onChange={(e) => this.onInputChange(e, { body: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" disabled={!this.state.formValid}>Submit</Button>
                                {'  '}
                                <Button color="primary" onClick={(e) => this.handleClearForm(e)}>Cancel</Button>
                            </FormGroup>
                        </Form>
                        <FormErrors formErrors={this.state.formErrors} />
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
                                    <Button size="sm" onClick={() => this.handleClickEditComment(comment)}>
                                        Edit
                                    </Button>
                                    <Button size="sm" onClick={() => this.handleClickDeleteComment(comment)}>
                                        Delete
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
        comments: state.commentsReducer.comments,
        comment: state.commentsReducer.comment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onEditComment: (comment) => dispatch(getComment(comment)),
        onSaveComment: (comment) => dispatch(saveComment(comment)),
        onClickVoteComment: (comment, post, option) => dispatch(voteComment(comment, post, option)),
        onClickDeleteComment: (comment) => dispatch(deleteComment(comment))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormComment))