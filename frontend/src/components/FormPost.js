import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
    Button,
    Form,
    FormGroup,
    Input,
    Card,
    CardBody,
    CardHeader
} from 'reactstrap'
import { savePost } from '../actions'
import { FormPostErrors } from './FormPostErrors'

class FormPost extends Component {

    static postInstance = {
        title: '',
        body: '',
        author: '',
        category: '',
        voteScore: 0,
        timestamp: Date.now(),
        deleted: false
    }

    state = {
        postToSave: {
            ...FormPost.postInstance,
            ...this.props.post
        },
        category: '',
        formErrors: { author: '', title: '', body: '', category: '' },
        authorValid: false,
        titleValid: false,
        bodyValid: false,
        categoryValid: false
    }

    handleSubmit = (e, history) => {
        e.preventDefault();
        this.props.onSavePost({
            ...this.state.postToSave
        }, history);
        //console.log({ 
        //    ...this.state.commentToSave
        //})
        //if (this.props.onCreateContact)
        //    this.props.onCreateContact(values)
    }

    onInputChange = (e, input) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            ...this.state,
            postToSave: { ...this.state.postToSave, ...input }
        }, () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let authorValid = this.state.authorValid;
        let titleValid = this.state.titleValid;
        let bodyValid = this.state.bodyValid;
        let categoryValid = this.state.categoryValid;

        switch (fieldName) {
            case 'author':
                authorValid = value.length >= 3;
                fieldValidationErrors.author = authorValid ? '' : ' is too short';
                break;
            case 'title':
                titleValid = value.length >= 3;
                fieldValidationErrors.title = titleValid ? '' : ' is too short';
                break;
            case 'body':
                bodyValid = value.length >= 3;
                fieldValidationErrors.body = bodyValid ? '' : ' is too short';
                break;
            case 'category':
            categoryValid = value !== '';
                fieldValidationErrors.body = categoryValid ? '' : ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            authorValid: authorValid,
            titleValid: titleValid,
            bodyValid: bodyValid,
            categoryValid: categoryValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.authorValid && this.state.titleValid && this.state.bodyValid && this.state.categoryValid });
    }

    render() {
        const { categories, history } = this.props
        const { postToSave } = this.state

        return (
            <div>
                <Card>
                    <CardHeader>Add or Edit a Post</CardHeader>
                    <CardBody>
                        <Form onSubmit={(e) => this.handleSubmit(e, history)}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="author"
                                    value={postToSave && postToSave.author}
                                    placeholder="Author"
                                    onChange={(e) => this.onInputChange(e, { author: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="title"
                                    value={postToSave && postToSave.title}
                                    placeholder="Title"
                                    onChange={(e) => this.onInputChange(e, { title: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="textarea"
                                    name="body"
                                    value={postToSave && postToSave.body}
                                    placeholder="Body"
                                    onChange={(e) => this.onInputChange(e, { body: e.target.value })} />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="category"
                                    value={postToSave && postToSave.category}
                                    onChange={(e) => this.onInputChange(e, { category: e.target.value })}>
                                    <option value="" disabled>Category...</option>
                                    {categories && categories.map((category, index) => (
                                        <option value={category.name} key={index}>{category.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" disabled={!this.state.formValid}>Submit</Button>
                                {'  '}
                                <Button color="primary" onClick={history.goBack}>Cancel</Button>
                            </FormGroup>
                            <FormPostErrors formErrors={this.state.formErrors} />
                        </Form>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        post: state.postsReducer.post,
        categories: state.postsReducer.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onSavePost: (post, history) => dispatch(savePost(post, history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormPost))