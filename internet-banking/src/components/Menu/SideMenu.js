import React, { Component } from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
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

  componentDidMount() {
    const { pathname } = this.props.location;
    const path = pathname.substr(pathname.lastIndexOf('/') + 1);
    if(path) {
      this.setState({
        activeMenu: path
      })
    }
  }

  render() {
    const userMenus = [
      {
        key: 'dashboard',
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
      // {
      //   key: 'layout',
      //   name: 'layout',
      //   icon: 'grid layout',
      //   link: '/dashboard'
      // },
      {
        key: 'payments',
        name: 'List Payment',
        icon: 'payment',
        link: '/dashboard'
      },
      {
        key: 'recipient',
        name: 'Recipients',
        icon: 'address book outline',
        link: '/dashboard'
      },
      {
        key: 'history',
        name: 'History',
        icon: 'history',
        link: '/dashboard'
      },
      {
        key: 'transactions',
        name: 'transactions',
        icon: 'bar chart',
        link: '/dashboard/transactions'
      }
    ];

    const employeeMenus = [
      {
        key: 'clients',
        name: 'Clients',
        icon: 'users',
        link: '/dashboard'
      },
      {
        key: 'recharge',
        name: 'Recharge',
        icon: 'usd',
        link: '/dashboard'
      },
    ];

    const USER = true;
    const menus = USER ? userMenus : employeeMenus;

    return (
      <Segment stacked compact>
        <div className="left-menus">
          {menus.map(item => {
            if (item.submenus) {
              return (
                <div key={item.key}
                  className={this.state.activeMenu === item.key ? 'menu active' : 'menu' }
                  onClick={() => this.setState({ activeMenu: item.key })}>
                    <Icon name={item.icon} size="large"/>
                    <span>{item.name}</span>
                    <Icon name={this.state.activeMenu === item.key ? "angle up" : "angle down" }/>
                  <div className="">
                    <div className={ 'sub-menu-container ' +
                        (this.state.activeMenu === item.key ? 'active' : '') } >
                      <SubMenu submenu={item.submenus} menu={item} />
                    </div>
                  </div>
                </div>
              )
            } else {
              return (
                <Link to={item.link} name={item.name} key={item.key}
                  className={this.state.activeMenu === item.key ? 'menu active' : 'menu' }
                  onClick={() => this.setState({ activeMenu: item.key })}
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

export default withRouter(SideMenu);

