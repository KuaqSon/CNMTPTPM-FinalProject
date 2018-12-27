import React, { Component } from 'react';
import SideMenu from '../components/Menu/SideMenu';
import TopMenu from '../components/Menu/TopMenu';
import { Grid, Segment } from 'semantic-ui-react'

class Layout extends Component {

  render() {
    return (
      <div className="grid">
        <TopMenu />
        <Grid>
          <Grid.Column width={4}>
            <SideMenu />
          </Grid.Column>

          <Grid.Column stretched width={12}>
            <Segment>
              {this.props.children}
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
  
}


export default Layout;