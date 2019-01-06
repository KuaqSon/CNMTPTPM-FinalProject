import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Table, Button, Dimmer, Loader, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchClients } from '../../actions/clients';
import { addPayment } from '../../actions/payment';

class ClientsList extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      modalVisible: false,
      modalSuccessVisible: false,
      selectedClient: '',
      selectedId: ''
    };
  }

  componentWillMount() {
    this.props.fetchClients();
  }

  closeModal = () => this.setState({ modalVisible: false })
  closeSuccess = () => this.setState({
    modalSuccessVisible: false,
    selectedClient: '',
    selectedId: ''
  })

  showNewPaymentConfirm = (id, clientName) => {
    this.setState({
      modalVisible: true,
      selectedClient: clientName,
      selectedId: id,
    })
  }

  submitNewPayment = (id) => {
    if (id === '') {
      return;
    }

    this.setState({
      loading: true,
      modalVisible: false,
      modalSuccessVisible: true
    })

    this.props.addPayment({
      idUser: id,
      asset: 0
    })
      .then(data => {
        this.setState({
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          loading: false
        })
        console.log("fail")
      });
  }

  rechargeClient = (id) => {
    this.props.history.push(`/dashboard/clients/recharge/${id}`);
  }

  render() {
    const { modalVisible, modalSuccessVisible, loading } = this.state;
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
        <div>
          <Modal
            dimmer="blurring"
            size="tiny"
            open={modalVisible}
            closeOnDimmerClick={false}
            onClose={this.closeModal}
          >
            <Modal.Header>Add new payment</Modal.Header>
            <Modal.Content>
              <p>Are you sure you want to add new payment to client <strong>{this.state.selectedClient}</strong>?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.closeModal} negative>
                No
            </Button>
              <Button
                onClick={() => this.submitNewPayment(this.state.selectedId)}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Yes'
              />
            </Modal.Actions>
          </Modal>

          <Modal
            dimmer="blurring"
            size="tiny"
            open={modalSuccessVisible}
            closeOnDimmerClick={false}
            onClose={this.closeSuccess}
          >
            <Modal.Header>Success!</Modal.Header>
            <Modal.Content>
              {loading ?
                <Dimmer active inverted>
                  <Loader inverted content='Loading' inline='centered' />
                </Dimmer>
                :
                <p>Added new payment to client <strong>{this.state.selectedClient}</strong></p>
              }
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => this.closeSuccess()}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Ok'
              />
            </Modal.Actions>
          </Modal>

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
                    <Button animated='fade' inverted color='green' onClick={() => this.showNewPaymentConfirm(c._id, c.name)}>
                      <Button.Content visible>New payment</Button.Content>
                      <Button.Content hidden>
                        <Icon name='credit card outline' />
                      </Button.Content>
                    </Button>
                    <Button animated='fade' inverted color='brown' onClick={() => this.rechargeClient(c._id)}>
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
        </div>
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
    fetchClients: () => dispatch(fetchClients()),
    addPayment: data => dispatch(addPayment(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientsList));
