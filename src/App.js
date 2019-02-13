import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/cars ")
      .then(res => res.json())
      .then(
        (json) => {
          this.setState({
            isLoaded: true,
            items: json,
          });
        },
      )
  }

  render() {

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <dir>Loading....</dir>;
    }

    else {
      return (
        <div className="App">
          Data has be loaded
      </div>
      );
    }
  }
}
  export default App;
