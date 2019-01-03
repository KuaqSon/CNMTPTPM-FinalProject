import React, { Component } from 'react';
import SideMenu from '../components/Menu/SideMenu';
import TopMenu from '../components/Menu/TopMenu';
import { Grid, Segment } from 'semantic-ui-react'
import './Layout.css';

class Layout extends Component {

  render() {
    return (
      <div className="grid">
        <TopMenu />
        <Grid className="p-1" divided>
          <Grid.Row>
            <Grid.Column className="dash-left">
              <SideMenu />
            </Grid.Column>

            <Grid.Column stretched className="dash-right">
              <Segment stacked>
                {this.props.children}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
  
}


export default Layout;