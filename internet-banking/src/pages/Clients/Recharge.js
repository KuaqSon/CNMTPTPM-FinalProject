import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import RechargeForm from '../../components/Clients/RechargeForm';
import {
  Header,
  Icon
} from 'semantic-ui-react';

class Recharge extends Component {

  render() {
    const { match: { params } } = this.props;
    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              Recharge
              <Header.Subheader>Add new client account</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <RechargeForm clientId={params.clientId}/>
        </div>
      </div>
    );
  }
}

export default withRouter(Recharge);
