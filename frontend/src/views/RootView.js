import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Card, CardBody, CardHeader, Button } from 'reactstrap';
import { ListPosts } from '../components/ListPosts'
import { listPosts, listCategories, listPostsByCategory, detailPost, editPost, votePost, sortBy, deletePost } from '../actions'
import _ from 'lodash'

class RootView extends Component {

    async componentDidMount() {
        const { listPosts, listCategories, sortBy } = this.props
        await Promise.all([listPosts(sortBy), listCategories()]);
    }

    handleChangeSortBy = (field) => {
        const orderedPosts = _.sortBy(this.props.posts, field);
        if (field === 'voteScore') orderedPosts.reverse();
        this.props.onSortBy(orderedPosts);
    }

    handleClickCategory = (event, category, history) => {
        event.preventDefault();
        this.props.onClickCategory(category, history);
    }

    handleClickPost = (event, post, history) => {
        event.preventDefault();
        this.props.onClickPost(post, history);
    }

    handleClickEditPost = (event, post, history) => {
        event.preventDefault();
        this.props.onClickEditPost(post, history);
    }

    handleClickDeletePost = (event, post, history) => {
        event.preventDefault();
        this.props.onClickDeletePost(post, history);
    }

    handleClickVotePost = (event, post, option) => {
        event.preventDefault();
        this.props.onClickVotePost(post, option);
    }

    render() {
        const { categories, posts, isFetching, history, sortBy } = this.props
        const postInstance = {
            title: '',
            body: '',
            author: '',
            category: '',
            voteScore: 0,
            timestamp: Date.now(),
            deleted: false
        }
        const postInstanceToPass = { ...postInstance };

        return (
            <div>
                <Row>
                    <Col xs="12">
                        <select name="shelf" value={sortBy} onChange={(event) => this.handleChangeSortBy(event.target.value)}>
                            <option value="sortby" disabled>Sort by...</option>
                            <option value="voteScore">Vote Score</option>
                            <option value="timestamp">Date</option>
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col xs="8">
                        <ListPosts posts={posts} isFetching={isFetching} history={history} handleClickPost={this.handleClickPost} handleClickVotePost={this.handleClickVotePost} handleClickEditPost={this.handleClickEditPost} handleClickDeletePost={this.handleClickDeletePost} />
                    </Col>
                    <Col xs="4">
                        <Card>
                            <CardHeader>Categories</CardHeader>
                            <CardBody>
                                <ul>
                                    {!isFetching && categories !== null &&
                                        categories.map(category => (
                                            <li key={category.name}>
                                                <a href="/" onClick={(event) => this.handleClickCategory(event, category.name, history)}>{category.name}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </CardBody>
                        </Card>
                        <br />
                        <div className="align-center">
                            <Button color="primary" onClick={(event) => this.handleClickEditPost(event, postInstanceToPass, history)}>New Post</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categories: state.postsReducer.categories,
        posts: state.postsReducer.posts,
        isFetching: state.isFetching,
        comments: state.postsReducer.comments,
        sortBy: state.postsReducer.sortBy
    }
}


function mapDispatchToProps(dispatch) {
    return {
        listPosts: (sortBy) => dispatch(listPosts(sortBy)),
        listCategories: () => dispatch(listCategories()),
        onClickCategory: (category, history) => dispatch(listPostsByCategory(category, history)),
        onClickPost: (post, history) => dispatch(detailPost(post, history)),
        onClickVotePost: (post, option) => dispatch(votePost(post, option, 'list')),
        onSortBy: (posts) => dispatch(sortBy(posts)),
        onClickEditPost: (post, history) => dispatch(editPost(post, history)),
        onClickDeletePost: (post, history) => dispatch(deletePost(post, history))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RootView))