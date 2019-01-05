import React, { Component } from 'react';
import { Header, Image, Table, Button, Dimmer, Loader } from 'semantic-ui-react';
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

    console.log(this.props.clients);
    // const Clients = this.props.clients.map(c => (<div key={c.id}></div>))

    if (!this.props.fetchClientsStatus) {
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
              <Table.HeaderCell>No.</Table.HeaderCell>
              <Table.HeaderCell>Full name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>22</Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Image
                    src='https://react.semantic-ui.com/images/avatar/small/lena.png'
                    rounded
                    size='mini'
                  />
                  <Header.Content>
                    Lena
                </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>2242342342342324234234</Table.Cell>
              <Table.Cell>22423423</Table.Cell>
              <Table.Cell>
                <Button content='New payment' icon='pause' labelPosition='left' />
                <Button content='Recharge' icon='right arrow' labelPosition='right' />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>15</Table.Cell>
              <Table.Cell>
                <Header as='h4' image>
                  <Image
                    src='https://react.semantic-ui.com/images/avatar/small/matthew.png'
                    rounded
                    size='mini'
                  />
                  <Header.Content>
                    Matthew
                </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>1523423423423423423</Table.Cell>
              <Table.Cell>22423423</Table.Cell>
              <Table.Cell>
                <Button content='New payment' icon='pause' labelPosition='left' />
                <Button content='Recharge' icon='right arrow' labelPosition='right' />
              </Table.Cell>
            </Table.Row>
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
