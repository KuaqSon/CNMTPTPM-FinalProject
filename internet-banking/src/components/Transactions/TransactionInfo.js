import React, { Component } from 'react';
import { Button, Icon, Form, Input, Radio, Select, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setTransactionInfo } from '../../actions/transaction';

class TransactionInfor extends Component {
  state = { name: '', amount: '', message: '', password: '', phone: '', loading: false, isSubmit: false }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })
 
  handleSubmit () {
    const {amount, message } = this.state;
    this.setState({
      loading: true,
      isSubmit: true
    })

    this.props.setTransactionInfo({
      amount,
      message
    })

  }

  render() {
    const { amount, message, isSubmit } = this.state
    return (
      <Segment>
        <div className="mt-2">
          <Form className="w-600 m-auto">
              <Form.Input
                name='amount'
                value={amount}
                label='Amount'
                icon="dollar"
                placeholder='0.00'
                onChange={this.handleChange}
              />
              <Form.TextArea
                name='message'
                value={message}
                label='Message'
                placeholder='Enter username'
                onChange={this.handleChange}
              />
              {!isSubmit && <Button animated='fade' onClick={() => this.handleSubmit()}>
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name='check' />
              </Button.Content>
            </Button>}
          </Form>
        </div>
        {isSubmit && <Message color="green">Submitted transaction info, please go next to choose who is the person pay the transaction fee</Message>}
      </Segment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setTransactionInfo: data => dispatch(setTransactionInfo(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionInfor);
