import React, { Component } from 'react';
import ListRecipients from '../../components/Recipients/ListRecipients';
import {
  Header,
  Icon,
  Button
} from 'semantic-ui-react';
import { withRouter} from 'react-router-dom';

class Recipients extends Component {
  gotoNewRecipient() {
    this.props.history.push("/dashboard/recipients/new");
  }
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
          <div className="mb-2">
            <Button animated='fade' inverted color='violet' onClick={() => this.gotoNewRecipient()}>
              <Button.Content visible>New Recipient</Button.Content>
              <Button.Content hidden>
                <Icon name='add' />
              </Button.Content>
            </Button>
          </div>
          <ListRecipients />
        </div>
      </div>
    );
  }
}

export default withRouter(Recipients);
