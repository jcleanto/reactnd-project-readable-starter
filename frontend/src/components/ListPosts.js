import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap';

class ListPosts extends Component {
    render() {
        const { items, isFetching } = this.props
        //console.log(items)
        return (
            <Row>
                <Col xs="8">
                    <ul>
                        {!isFetching && items !== null &&
                            <li key={items.id}>
                                <h1 className="mt-4">{items.title}</h1>
                                <p className="lead">by {items.author}</p>
                                <hr />
                                <p>Posted on {items.timestamp}</p>
                                <hr />
                            </li>
                        }
                    </ul>
                </Col>
                <Col xs="4">
                    teste
                </Col>
            </Row>
        )
    }
}

function mapStateToProps(state) {
    const activePosts = state.posts.items//.map(post => ({...post, post}));
    return {
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
