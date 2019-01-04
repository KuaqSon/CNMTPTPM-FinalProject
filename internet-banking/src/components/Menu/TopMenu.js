import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";

class TopMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu stackable>
        <Menu.Item>
          Doubble Son
        </Menu.Item>

        {/* <Menu.Item
          name='features'
          active={activeItem === 'features'}
          onClick={this.handleItemClick}
        >
          Features
        </Menu.Item>

        <Menu.Item
          name='testimonials'
          active={activeItem === 'testimonials'}
          onClick={this.handleItemClick}
        >
          Testimonials
        </Menu.Item> */}

        {/* <Menu.Item name='sign-in' active={activeItem === 'sign-in'} onClick={this.handleItemClick}>
          Sign-in
        </Menu.Item> */}
        <Menu.Item position='right' name='Logout' active={activeItem === 'Logout'} onClick={() => this.props.history.push("/")}>
          Logout
        </Menu.Item>
      </Menu>
    )
  }
}


export default withRouter(TopMenu);