import React, { Component } from 'react';
import NewClientForm from '../../components/Clients/NewClientForm';
import {
  Header,
  Icon
} from 'semantic-ui-react';

class NewClient extends Component {
  render() {

    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              New Client
              <Header.Subheader>Add new client account</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <NewClientForm />
        </div>
      </div>
    );
  }
}

export default NewClient;
