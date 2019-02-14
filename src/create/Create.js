import React, { Component } from "react";
import { Menu, Button, Radio, Checkbox, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import callApi from "../util/api";

const options = [
  { key: "b", text: "Black", value: "BLACK" },
  { key: "p", text: "Pink", value: "PINK" }
];

class Create extends Component {
  state = { colour: "BLACK", speed: 26, brand: "BMW", isAwesome: true };

  handleChange = (e, { value }) =>
    this.setState({ isAwesome: value === "1" ? true : false });

  render() {
    const { colour, speed, brand, isAwesome } = this.state;

    return (
      <Form>
        <Form.Select
          fluid
          label="Colour"
          options={options}
          placeholder="Colour"
          value={colour}
          onChange={(event, data) => this.setState({ colour: data.value })}
        />
        <Form.Field>
          <label>Speed</label>
          <input
            placeholder="Speed"
            value={speed}
            onChange={(event) => this.setState({ speed: event.target.value })}
          />
        </Form.Field>
        <Form.Field>
          <label>Brand</label>
          <input
            placeholder="Brand"
            value={brand}
            onChange={(event) => this.setState({ brand: event.target.value })}
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
        <Button
          type="submit"
          onClick={() => {
            callApi("cars", 'post', this.state).then(result => {
              if (result instanceof Error) {
              } else {
                this.setState({ colour: "black", speed: 26, brand: "BMW", isAwesome: true })
              }
            });
          }}
        >
          Submit
        </Button>
      </Form>
    );
  }
}
export default Create;
