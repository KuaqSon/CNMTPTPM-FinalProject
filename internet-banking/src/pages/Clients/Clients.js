import React, { Component } from 'react';
import ClientsList from '../../components/Clients/ClientsList';
import {
  Header,
  Icon
} from 'semantic-ui-react';

class Recipients extends Component {
  render() {

    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              Clients
              <Header.Subheader>List of clients</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <ClientsList />
        </div>
      </div>
    );
  }
}

export default Recipients;
