import React, {Component} from 'react';
import ListRecipients from '../../components/Recipients/ListRecipients';
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
              Recipients
              <Header.Subheader>List of your recipients</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <ListRecipients />
        </div>
      </div>
    );
  }
}

export default Recipients;
