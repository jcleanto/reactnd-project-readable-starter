import React, { Component } from "react";
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import ListPosts from './ListPosts'
import DetailPost from './DetailPost'
import { listPosts } from '../actions'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Jumbotron
} from 'reactstrap';
import _ from 'lodash'

class App extends Component {

  state = {
    isOpen: false
  }

  async componentDidMount() {
    const { listPosts } = this.props
    await listPosts();
    /*this.setState({
      posts: _.sortBy(posts, 'voteScore').reverse()
    });*/
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  sortBy = (field) => {
    const orderedPosts = _.sortBy(this.state.posts, field)
    if (field === 'voteScore') orderedPosts.reverse()
    /*this.setState({
      posts: orderedPosts
    });*/
  }

  render() {
    //const { posts } = this.state
    //console.log(posts)
    return (
      <div className="App">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Readable</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/posts">New Post</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <Container>
            <Switch>
              <Route exact path="/" component={ListPosts} />
              <Route exact path="/:category" component={ListPosts} />
              <Route path="/:category/:post_id" component={DetailPost} />
            </Switch>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listPosts: () => dispatch(listPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)