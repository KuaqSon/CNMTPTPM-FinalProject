import React, { Component } from 'react';
import { Button, Icon, Card, Input, Radio, Select, Message, Segment, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { callOTP } from '../../actions/transaction';

class TransactionConfirm extends Component {
  state = {}

  submitToOTP = (idUser) => {
    this.props.callOTP({
      idUser: idUser
    })
  }

  render() {
    const { idUser, sendCardNumber, recipientCardNumber, amount, message, isPayer} = this.props;
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
        <Button animated='fade' color="google plus" size='big' onClick={() => this.submitToOTP(idUser)}>
          <Button.Content visible>Submit</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button>
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
