import React, { Component } from 'react';
import { Header, Icon, Table, Button, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions/clients';

class ClientsList extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentWillMount() {
    this.props.fetchClients();
  }

  render() {

    const { clients, fetchClientsStatus } = this.props;
    // console.log(clients);

    if (!fetchClientsStatus) {
      return (
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      )
    } else {
      return (
        <Table celled collapsing selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell>Full name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {clients.map(c => (
              <Table.Row key={clients.indexOf(c)}>
                <Table.Cell>{c.username}</Table.Cell>
                <Table.Cell>
                  <Header as='h4' image>
                    {/* <Image
                      src='https://react.semantic-ui.com/images/avatar/small/matthew.png'
                      rounded
                      size='mini'
                    /> */}
                    <Header.Content>
                      {c.name}
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>{c.email}</Table.Cell>
                <Table.Cell>{c.phoneNumber}</Table.Cell>
                <Table.Cell>
                  <Button animated='fade' inverted color='green'>
                    <Button.Content visible>New payment</Button.Content>
                    <Button.Content hidden>
                      <Icon name='credit card outline' />
                    </Button.Content>
                  </Button>
                  <Button animated='fade' inverted color='brown'>
                    <Button.Content visible>Recharge</Button.Content>
                    <Button.Content hidden>
                      <Icon name='money bill alternate outline' />
                    </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    clients: state.clients.data,
    fetchClientsStatus: state.clients.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchClients: () => dispatch(fetchClients())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsList);
