import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getComment } from '../actions'
import FormPost from '../components/FormPost'

class EditPostView extends Component {

    render() {
        return (
            <div>
               <FormPost /> 
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        post: state.postsReducer.post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onEditComment: (comment) => dispatch(getComment(comment))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditPostView))