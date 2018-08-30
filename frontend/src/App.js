import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: "backend-data"
    };
  }

  //To run inside the Workspace, please include the credentials.
  
  componentDidMount() {
    const api = process.env.REACT_APP_BACKEND || 'http://localhost:3001';
    const url = `${api}/categories`;
    console.log("fetching from url", url);
    fetch(url, {
      headers: { Authorization: "whatever-you-want" },
      credentials: "include"
    })
      .then(res => {
        return res.text();
      })
      .then(data => {
        this.setState({ backend: data });
      });
  }

  // To run outside of the Workspace, please do not include the credentials.

  /* 
  componentDidMount() {
    const api = process.env.REACT_APP_BACKEND ||  'http://localhost:3001';
    const url = `${api}/categories`;
    console.log('fetching from url', url);
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' }} )
      .then( (res) => { return(res.text()) })
      .then((data) => {
        this.setState({backend:data});
      });
  }
  */

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          Talking to the backend yields these categories: <br />
          {this.state.backend}
        </p>
      </div>
    );
  }
}

export default App;