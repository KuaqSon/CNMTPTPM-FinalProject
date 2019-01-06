import React, { Component } from 'react';
import NewRecipientForm from '../../components/Recipients/NewRecipientForm';
import {
  Header,
  Icon
} from 'semantic-ui-react';

class NewRecipient extends Component {
  render() {

    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              New Recipient
              <Header.Subheader>Add new recipient account</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <NewRecipientForm />
        </div>
      </div>
    );
  }
}

export default NewRecipient;
