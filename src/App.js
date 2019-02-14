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
  Sidebar,
  Modal,
  Radio,
  Form
} from "semantic-ui-react";

const options = [
  { key: "b", text: "Black", value: "BLACK" },
  { key: "p", text: "Pink", value: "PINK" }
  ,
  { key: "p", text: "Red", value: "RED" }
  ,
  { key: "p", text: "Blue", value: "BLUE" }

];

class App extends Component {
  handleChange = (e, { value }) =>
    this.setState({ isAwesome: value === "1" ? true : false });

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      isLoaded: false,
      colour: "BLACK",
      speed: 26,
      brand: "BMW",
      isAwesome: true
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
    const {
      error,
      isLoaded,
      items,
      colour,
      speed,
      brand,
      isAwesome
    } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var data = items.map(item => (
      
          <List.Content>
            <Card>
              <Card.Content className = "List-Size">
                <Card.Header>{item.brand}</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Modal
                    trigger={
                      <Button basic color="grey">
                        Detail
                      </Button>
                    }
                    basic
                    size="small"
                  >
                    <Header icon="detail" content="Information about car" />
                    <Modal.Content>
                      <List>
                        <List.Item>
                          <List.Header>Car ID</List.Header>
                          {item.id}
                        </List.Item>
                        <List.Item>
                          <List.Header>Car colour</List.Header>
                          {item.colour}
                        </List.Item>
                        <List.Item>
                          <List.Header>Car speed</List.Header>
                          {item.speed}
                        </List.Item>
                        <List.Item>
                          <List.Header>Car brand</List.Header>
                          {item.brand}
                        </List.Item>
                        <List.Item>
                          <List.Header>Car is awesome?</List.Header>
                          {item.isAwesome}
                        </List.Item>
                      </List>
                    </Modal.Content>
                  </Modal>
                  <Modal
                    trigger={
                      <Button basic color="green">
                        Update
                      </Button>
                    }
                    basic
                    size="small"
                  >
                    <Header icon="update" content="Update your car" />
                    <Modal.Content>
                      <Form>
                        <Form.Select
                          fluid
                          label="Gender"
                          options={options}
                          placeholder="Gender"
                          value={colour}
                          onChange={(event, data) =>
                            this.setState({ colour: data.value })
                          }
                        />
                        <Form.Field>
                          <label>Speed</label>
                          <input
                            placeholder="Speed"
                            value={speed}
                            onChange={event =>
                              this.setState({ speed: event.target.value })
                            }
                          />
                        </Form.Field>
                        <Form.Field>
                          <label>Brand</label>
                          <input
                            placeholder="Brand"
                            value={brand}
                            onChange={event =>
                              this.setState({ brand: event.target.value })
                            }
                          />
                        </Form.Field>
                        <Form.Group inline>
                          <label>Is awesome</label>
                          <Form.Field
                            control={Radio}
                            label="True"
                            value="1"
                            checked={isAwesome === true}
                            onChange={this.handleChange}
                          />
                          <Form.Field
                            control={Radio}
                            label="False"
                            value="0"
                            checked={isAwesome === false}
                            onChange={this.handleChange}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        basic
                        color="red"
                        inverted
                        onClick={() => {
                          callApi("cars", "id", "get", this.state).then(
                            result => {
                              if (result instanceof Error) {
                              } else {
                                this.setState({
                                  colour: "black",
                                  speed: 26,
                                  brand: "BMW",
                                  isAwesome: true
                                });
                              }
                            }
                          );
                        }}
                      >
                        <Icon name="submit" /> submit
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  <Modal
                    trigger={
                      <Button basic color="red">
                        Delete
                      </Button>
                    }
                    basic
                    size="small"
                  >
                    <Header icon="archive" content="Delete car" />
                    <Modal.Content>
                      <p>Would you like delete car from list?</p>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button
                        basic
                        color="red"
                        inverted
                      >
                        <Icon name="remove" /> No
                      </Button>
                      <Button color="green" inverted
                      onClick={() => {
                          callApi("cars/{item.id}", "delete")
                        }}>
                        <Icon name="checkmark" /> Yes
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </div>
              </Card.Content>
            </Card>
          </List.Content>
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
