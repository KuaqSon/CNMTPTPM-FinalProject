import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import './SideMenu.css';

class SubMenu extends Component {
  render() {
    let subMenu = this.props.submenu;

    if (subMenu !== null) {
      return (
        <div>
          {subMenu.map(submenu => {
            return (
              <div key={submenu.name} className="sub-menu">
                <Link to={submenu.link}>
                  <Icon name="plus" size="small"/>
                  <span>{submenu.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div></div>
    }
  }
}

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: 'dashboard'
    };
  }

  render() {
    const menus = [
      {
        name: 'dashboard',
        icon: 'inbox',
        link: '/dashboard'
      },
      // {
      //   name: 'form',
      //   icon: 'checkmark box',
      //   submenus: [
      //     { name: 'input' },
      //     { name: 'range-picker' }
      //   ]
      // },
      // {
      //   name: 'dropdown',
      //   icon: 'sitemap',
      // },
      // {
      //   name: 'calendar',
      //   icon: 'calendar check',
      // },
      {
        name: 'layout',
        icon: 'grid layout',
        link: '/dashboard'
      },
      {
        name: 'transactions',
        icon: 'bar chart',
        link: '/dashboard/transactions'
      }
    ];

    return (
      <Segment>
        <div className="left-menus">
          {menus.map(item => {
            if (item.submenus) {
              return (
                <div key={item.name}
                  className={this.state.activeMenu === item.name ? 'menu active' : 'menu' }
                  onClick={() => this.setState({ activeMenu: item.name })}>
                    <Icon name={item.icon} size="large"/>
                    <span>{item.name}</span>
                    <Icon name={this.state.activeMenu === item.name ? "angle up" : "angle down" }/>
                  <div className="">
                    <div className={ 'sub-menu-container ' +
                        (this.state.activeMenu === item.name ? 'active' : '') } >
                      <SubMenu submenu={item.submenus} menu={item} />
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <Link to={item.link} name={item.name} key={item.name}
                  className={this.state.activeMenu === item.name ? 'menu active' : 'menu' }
                  onClick={() => this.setState({ activeMenu: item.name })}
                  >
                  <Icon name={item.icon} size="large"/>
                  <span>{item.name}</span>
                </Link>
              )
            }
          })}
        </div>
      </Segment>
    );
  }
}

export default SideMenu;

