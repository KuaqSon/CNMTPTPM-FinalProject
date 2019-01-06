import React, { Component } from 'react';
import { Button, Icon, Card, Input, Radio, Select, Message, Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setTransactionPayer } from '../../actions/transaction';

class TransactionConfirm extends Component {
  state = {isPayer: false}

  hanldPayer = (pay) => {
    this.setState({
      isPayer: pay
    })

    this.props.setTransactionPayer(pay);
  }



  render() {
    const { isPayer } = this.state
    return (
      <Segment textAlign="center">
        
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
    setTransactionPayer: data => dispatch(setTransactionPayer(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionConfirm);
