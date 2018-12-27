import React, { Component } from 'react'
import { Grid, Menu, Segment } from 'semantic-ui-react'

export default class SideMenu extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu fluid vertical tabular>
        <Menu.Item name='bio' active={activeItem === 'bio'} onClick={this.handleItemClick} />
        <Menu.Item name='pics' active={activeItem === 'pics'} onClick={this.handleItemClick} />
        <Menu.Item
          name='companies'
          active={activeItem === 'companies'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='links'
          active={activeItem === 'links'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}
