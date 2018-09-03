import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Card, CardBody, CardHeader, CardText } from 'reactstrap';
import { formatDate, formatHour } from '../utils/helpers'

class ListPosts extends Component {
    render() {
        const { categories, items, isFetching } = this.props
        console.log(categories)
        return (
            <Row>
                <Col xs="8">
                    <ul>
                        {!isFetching && items !== null &&
                            items.map(item => (
                                <li key={item.id}>
                                    <h1 className="mt-4">{item.title}</h1>
                                    <p className="lead">by {item.author}</p>
                                    <hr />
                                    <p>Posted on {formatDate(item.timestamp)} at {formatHour(item.timestamp)}</p>
                                    <hr />
                                </li>
                            ))
                        }
                    </ul>
                </Col>
                <Col xs="4">
                    <Card>
                        <CardHeader>Categories</CardHeader>
                        <CardBody>
                            <ul>
                                {!isFetching && categories !== null &&
                                    categories.map(category => (
                                        <li key={category.name}>
                                            <a href="#">{category.name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    const activePosts = state.posts.items.filter(post => !post.deleted);
    return {
        categories: state.posts.categories,
        items: activePosts,
        isFetching: state.isFetching
    }
}

/*
function mapDispatchToProps(dispatch) {
    return {

    }
}
*/

export default connect(mapStateToProps)(ListPosts)
