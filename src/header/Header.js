import "./Header.css";
import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Header extends Component {
  state = { activeItem: "List" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;

    return (
        <Menu tabular>
        <Menu.Item
          name="List"
          active={activeItem === "List"}
          onClick={this.handleItemClick}
        >
          <Link to="/">List</Link>
        </Menu.Item>
        <Menu.Item
          name="Create"
          active={activeItem === "Create"}
          onClick={this.handleItemClick}
        >
          <Link to="/create">Create</Link>
        </Menu.Item>
      </Menu>
    );
  }
}
export default Header;
