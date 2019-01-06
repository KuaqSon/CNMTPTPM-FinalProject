import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPayment } from '../../actions/payment';
import { fetchUserData } from '../../actions/auth';
import { addRecipient } from '../../actions/recipient';
import { withRouter } from 'react-router-dom'
import { Dimmer, Icon, Loader, Button, Segment, Form, Input, Message, Card } from 'semantic-ui-react';

class NewRecipientForm extends Component {
  state = { name: '', number: '', loading: false, isError: false, isFound: false, recipientName: '', recipientNumber: '', addError: false }

  componentDidMount() {
    this.props.fetchUserData();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, number } = this.state;
    if (number === '') {
      return;
    }
    this.setState({ loading: true, isError: false, isFound: false, recipientName: '', recipientNumber: '', addError: false });
    this.props.getPayment({
      accountNumber: number
    })
      .then(data => {
        const { resp, isError, msg } = data;
        if (isError) {
          this.setState({
            isError: true
          })
        } else {
          this.setState({
            isFound: true,
            recipientName: resp.name,
            recipientNumber: resp.accountNumber
          })
        }
        this.setState({
          loading: false
        })
      })
      .catch(error => console.log("fail"));
  }

  handleAddRecipient = (number) => {
    const { user } = this.props;
    const { _id } = user;
    this.setState({
      loading: true
    })
    this.props.addRecipient({
      idUser: _id,
      accountNumber: number
    })
      .then(data => {
        const { isError } = data;
        if (isError) {
          this.setState({
            addError: true,
            isFound: false,
            loading: false
          })
        } else {
          this.setState({
            loading: false
          })
          this.props.history.push("/dashboard/recipients")
        }
      })
      .catch(error => console.log("fail"));
  }

  render() {
    const { name, number, loading, isError, isFound, recipientName, recipientNumber, addError } = this.state;
    if (loading) {
      return (
        <Dimmer active inverted className="h-300">
          <Loader inverted content='Loading' />
        </Dimmer>
      )
    } else {
      return (
        <div>
          {isFound ?
            <Card className="w-600 m-auto">
              <Card.Content>
                <Card.Header>{recipientName}</Card.Header>
                <Card.Description>
                  <strong>{recipientNumber}</strong>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button basic color='green' onClick={() => this.handleAddRecipient(recipientNumber)}>
                  Add recipient
              </Button>
              </Card.Content>
            </Card>
            :
            <Segment className="w-600 m-auto">
              <Form>
                <Form.Input
                  name='number'
                  value={number}
                  label='Account Number'
                  placeholder='xxxx-xxxx-xxxx-xxxx'
                  type="number"
                  onChange={this.handleChange}
                />
                <Button animated='fade' onClick={() => this.handleSubmit()}>
                  <Button.Content visible>Search</Button.Content>
                  <Button.Content hidden>
                    <Icon name='search' />
                  </Button.Content>
                </Button>
              </Form>
              {isError &&
                <Message color='orange' className="mt-2">
                  User or payment method not found!
                </Message>}
              {addError &&
                <Message color='orange' className="mt-2">
                  Recipient has exited!
                </Message>}
            </Segment>}
        </div>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPayment: data => dispatch(getPayment(data)),
    fetchUserData: () => dispatch(fetchUserData()),
    addRecipient: data => dispatch(addRecipient(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRecipientForm));
