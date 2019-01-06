import React, { Component } from 'react';
import SideMenu from '../components/Menu/SideMenu';
import TopMenu from '../components/Menu/TopMenu';
import { Grid, Segment } from 'semantic-ui-react'
import './Layout.css';
import { connect } from 'react-redux';
import { fetchUserData } from '../actions/auth';

class Layout extends Component {
  componentWillMount() {
    this.props.fetchUserData();
  }
  render() {
    const { user } = this.props;
    const {name} = user;
    console.log(user);
    return (
      <div className="grid">
        <TopMenu nameOfUser={name}/>
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.data,
    authStatus: state.auth.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(fetchUserData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Layout);