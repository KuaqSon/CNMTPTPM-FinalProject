import React, { Component } from 'react';
import ClientsList from '../../components/Clients/ClientsList';
import {
  Header,
  Icon,
  Segment,
  Button
} from 'semantic-ui-react';
import { withRouter} from 'react-router-dom';

class Clients extends Component {
  gotoNewClient =() => {
    this.props.history.push("/dashboard/clients/new");
  }
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
          <div>
            <Segment>
              <Button animated='fade' onClick={() => this.gotoNewClient()}>
                <Button.Content visible>New Client</Button.Content>
                <Button.Content hidden>
                <Icon name='add' />
                </Button.Content>
              </Button>
            </Segment>
          </div>
          <ClientsList />
        </div>
      </div>
    );
  }
}

export default withRouter(Clients);
