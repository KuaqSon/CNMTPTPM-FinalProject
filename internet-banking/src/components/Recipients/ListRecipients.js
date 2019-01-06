import React, { Component } from 'react';
import { fetchRecipient, deleteRecipient, updateRecipient } from '../../actions/recipient';
import { fetchUserData } from '../../actions/auth';
import { connect } from 'react-redux';
import { Header, Image, Form, Table, Button, Icon, Dimmer, Loader, Modal } from 'semantic-ui-react';

class ListRecipients extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      modalVisible: false,
      modalSuccessVisible: false,
      identityName: '',
      selectedName: '',
      selectedNumber: '',
      selectedId: ''
    };
  }

  componentDidMount() {
    this.props.fetchUserData();
    this.loadRecipient();
  }

  loadRecipient() {
    const { user } = this.props;
    const { _id } = user;
    if (_id) {
      this.props.fetchRecipient({
        idUser: _id
      });
    }
  }
  handleDeleteRecipient = (id) => {
    this.setState({
      loading: true
    })
    this.props.deleteRecipient({
      idReceiver: id
    }).then(data => {
      this.loadRecipient();
      this.setState({
        loading: false
      })
    }).catch(err => console.log('false'))
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  closeModal = () => this.setState({ modalVisible: false })
  closeSuccess = () => this.setState({
    modalSuccessVisible: false,
    selectedName: '',
    selectedNumber: '',
    selectedId: ''
  })

  showEditModal = (id, recipientName, recipientNumber) => {
    this.setState({
      modalVisible: true,
      selectedName: recipientName,
      selectedNumber: recipientNumber,
      selectedId: id,
    })
  }

  submitEdit = () => {
    const { selectedId, identityName } = this.state;

    this.setState({
      loading: true,
      modalVisible: false,
      modalSuccessVisible: true
    })

    this.props.updateRecipient({
      name: identityName,
      idReceiver: selectedId
    })
      .then(data => {
        this.loadRecipient();
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

  render() {
    const { recipients, fetchRecipientsStatus } = this.props;
    const { loading, identityName, modalVisible, modalSuccessVisible, selectedName, selectedNumber, selectedId } = this.state;
    if (!fetchRecipientsStatus) {
      return (
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      )
    } else {
      return (
        <div>
        <Dimmer active={loading} inverted page>
          <Loader inverted content='Loading' />
        </Dimmer>
        <Modal
            dimmer="blurring"
            size="tiny"
            open={modalVisible}
            closeOnDimmerClick={false}
            onClose={this.closeModal}
          >
            <Modal.Header>Edit recipient {selectedName}</Modal.Header>
            <Modal.Content>
              <p>Account number: <strong>{selectedNumber}</strong></p>
            
              <Form className="mt-2">
                <Form.Input
                  name='identityName'
                  value={identityName}
                  label='Type another identity name if you have'
                  onChange={this.handleChange}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.closeModal} negative>
                No
            </Button>
              <Button
                onClick={() => this.submitEdit()}
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
                <p>Editted identity name of payment <strong>{selectedNumber}</strong></p>
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
        <Dimmer active={loading} inverted page>
          <Loader inverted content='Loading' />
        </Dimmer>
          <Table celled collapsing selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>No.</Table.HeaderCell>
                <Table.HeaderCell>Recipient</Table.HeaderCell>
                <Table.HeaderCell>Account number</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {recipients.map(r =>
                <Table.Row key={recipients.indexOf(r)}>
                  <Table.Cell>{recipients.indexOf(r)}</Table.Cell>
                  <Table.Cell>
                    <Header as='h4' image>
                      <Header.Content>
                        {r.name}
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{r.accountNumber}</Table.Cell>
                  <Table.Cell>
                    <Button animated='fade' inverted color='green' onClick={() => this.showEditModal(r._id, r.name, r.accountNumber)}>
                      <Button.Content visible>Edit</Button.Content>
                      <Button.Content hidden>
                        <Icon name='edit' />
                      </Button.Content>
                    </Button>
                    <Button animated='fade' inverted color='brown' onClick={() => this.handleDeleteRecipient(r._id)}>
                      <Button.Content visible >Delete</Button.Content>
                      <Button.Content hidden>
                        <Icon name='close' />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>)}
            </Table.Body>
          </Table>
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.data,
    recipients: state.recipient.data,
    fetchRecipientsStatus: state.recipient.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRecipient: data => dispatch(fetchRecipient(data)),
    fetchUserData: () => dispatch(fetchUserData()),
    deleteRecipient: (data) => dispatch(deleteRecipient(data)),
    updateRecipient: (data) => dispatch(updateRecipient(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListRecipients);
