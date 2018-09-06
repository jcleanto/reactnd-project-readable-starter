import React, { Component } from "react";
import { Route, Switch, withRouter } from 'react-router-dom'
import RootView from '../views/RootView'
import DetailPostView from '../views/DetailPostView'
import EditPostView from '../views/EditPostView'
import { ErrorView } from '../views/ErrorView'
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
import '../styles/App.css'

class App extends Component {

  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    return (
      <div className="App">
        <Navbar color="light" light expand="lg">
          <Container>
            <NavbarBrand href="/">Readable</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Home</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
        <Jumbotron>
          <Container>
            <Switch>
              <Route exact path="/" component={RootView} />
              <Route exact path="/error/page" render={() => <ErrorView />} />
              <Route exact path="/:category" component={RootView} />
              <Route exact path="/:category/:postId" component={DetailPostView} />
              <Route exact path="/posts/edit/:postId" component={EditPostView} />
            </Switch>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default withRouter(App)