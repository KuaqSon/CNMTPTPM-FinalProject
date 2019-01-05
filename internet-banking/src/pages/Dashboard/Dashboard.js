import React from 'react';
import {
  Container,
  Header,
  Placeholder,
  Icon
} from 'semantic-ui-react'

class Dashboard extends React.Component {
  render() {

    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              Dashboard
              <Header.Subheader>Manage your preferences</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <Container text style={{ marginTop: '2em', marginBottom: '1em' }}>
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Container>
      </div>
    );
  }
}

export default Dashboard;
