import React, { Component } from 'react';
import { Button, Icon, Card, Input, Radio, Select, Message, Segment, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { callOTP } from '../../actions/transaction';

class TransactionConfirm extends Component {
  state = {isSubmit: false}

  submitToOTP = (idUser, sendCardNumber) => {
    this.props.callOTP({
      idUser: idUser,
      accountNumber: sendCardNumber
    })
    this.setState({
      isSubmit: true
    })
  }

  render() {
    const { idUser, sendCardNumber, recipientCardNumber, amount, message, isPayer} = this.props;
    const { isSubmit } = this.state;
    console.log(idUser);
    return (
      <div>
      <Segment textAlign="left" className="w-600 m-auto">
        <Header as="h3">Transaction Confirm:</Header>
        <div className="p-1 mt-2">
          <div>Send card: <strong>{sendCardNumber}</strong></div>
          <div>Recipient card: <strong>{recipientCardNumber}</strong></div>
          <div>Amount: <strong>{amount}</strong></div>
          <div>Message: <strong>{message}</strong></div>
          <div>Who is pay fee of transaction: <strong>{isPayer ? "Payer" : "Payee"}</strong></div>
        </div>
      </Segment>
        {!isSubmit && <Button animated='fade' color="google plus" size='big' onClick={() => this.submitToOTP(idUser, sendCardNumber)}>
          <Button.Content visible>Submit</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>}

        {isSubmit && <Message color="green">Submitted transaction, please go next to verification the OTP code</Message>}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    callOTP: data => dispatch(callOTP(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionConfirm);
