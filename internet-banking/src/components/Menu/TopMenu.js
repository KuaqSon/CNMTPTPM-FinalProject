import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

class TopMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/");
  }
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
        <Menu.Menu position='right'>
          <Menu.Item name={this.props.nameOfUser}>
          </Menu.Item>
          <Menu.Item name='Logout' active={activeItem === 'Logout'} onClick={() => this.handleLogout()}>
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(
  null,
  mapDispatchToProps
)(TopMenu));