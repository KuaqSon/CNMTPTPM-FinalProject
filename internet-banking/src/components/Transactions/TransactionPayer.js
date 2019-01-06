import React, { Component } from 'react';
import { Button, Icon, Card, Input, Radio, Select, Message, Segment, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setTransactionPayer } from '../../actions/transaction';

class TransactionPayer extends Component {
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
        <div className="mt-2 w-600 m-auto">
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Card>
                  <Card.Content>
                    <Card.Header>Payee</Card.Header>
                    <Card.Description>Payee will pay the transfer fee.</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button inverted color='violet' onClick={() => this.hanldPayer(false)}>Select</Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column width={8}>
                <Card>
                  <Card.Content>
                    <Card.Header>Payer</Card.Header>
                    <Card.Description>Payer will pay the transfer fee</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button inverted color='brown' onClick={() => this.hanldPayer(true)}>Select</Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="mt-3">
            { isPayer && <Message color="violet">Payer will pay the fee of transaction</Message>}
            { !isPayer && <Message color="brown">Payee will pay the fee of transaction</Message>}
          </div>
        </div>
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
)(TransactionPayer);
