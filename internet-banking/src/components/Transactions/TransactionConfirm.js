import React, { Component } from 'react';
import { Button, Icon, Card, Input, Radio, Select, Message, Segment, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setTransactionPayer } from '../../actions/transaction';

class TransactionConfirm extends Component {
  state = {}


  render() {
    const { sendCardNumber, recipientCardNumber, amount, message, isPayer} = this.props;

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
        <Button animated='fade' color="google plus" size='big'>
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
    setTransactionPayer: data => dispatch(setTransactionPayer(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionConfirm);
