import "./App.css";
import React, { Component } from "react";
import callApi from "./util/api";
import {
  Image,
  List,
  Button,
  Card,
  Header,
  Icon,
  Menu,
  Segment,
  Sidebar
} from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    callApi("cars").then(result => {
      if (result instanceof Error) {
        this.setState({
          isLoaded: true,
          error: result
        });
      } else {
        this.setState({
          isLoaded: true,
          items: result
        });
      }
    });
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var data = items.map(item => (
        <List.Item>
          <List.Content>
            <Card>
              <Card.Content>
                <Card.Header>{item.id}</Card.Header>
                <Card.Meta>{item.id}</Card.Meta>
                <Card.Description>{item.brand}
                  <strong>{item.colour}</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button basic color="green">
                    Approve
                  </Button>
                  <Button basic color="red">
                    Decline
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </List.Content>
        </List.Item>
      ));

      return (
        <div>
          <List celled>{data}</List>
        </div>
      );
    }
  }
}
export default App;
