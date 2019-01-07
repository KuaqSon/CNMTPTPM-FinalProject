import React, { Component } from 'react'
import { Button, Icon, Card, Input, Radio, Form, TextArea, Segment, Grid, Message } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { submitData } from '../../actions/transaction';

class TransactionOTP extends Component {
  state = {otp: '', isSubmit: false}
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit() {
    const {otp} = this.state;
    if(otp === '') 
      return;

    const { idUser, sendCardNumber, recipientCardNumber, amount, message, isPayer} = this.props;
    this.props.submitData({
      accountNumber: sendCardNumber,
      transferTo: recipientCardNumber,
      transferMoney: amount,
      infor: message,
      type: 2,
      OTP: otp,
      idUser: idUser
    })

    this.setState({
      isSubmit: true
    })
  }


  render() {
    const { otp, isSubmit } = this.state
    return (
      <Segment textAlign="center">
        <div className="mt-2 w-600 m-auto">
          <Card>
            <Card.Content>
              <Card.Header>OTP verification</Card.Header>
              <Card.Description></Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Form className="w-400">
                <Form.Input
                  name='otp'
                  value={otp}
                  label='Type your received OTP'
                  placeholder='0000'
                  onChange={this.handleChange}
                />
              </Form>
              {/* <Input label="Type your received OTP" placeholder='0000' /> */}
            </Card.Content>
            <Card.Content extra>
              {!isSubmit && <Button animated='fade' color="google plus" size='big' onClick={() => this.handleSubmit()}>
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>}
              {isSubmit && <Message>Saved transaction successful!</Message>}
            </Card.Content>
          </Card>
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
    submitData: data => dispatch(submitData(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionOTP);
