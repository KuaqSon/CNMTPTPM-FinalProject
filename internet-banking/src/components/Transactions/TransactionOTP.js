import React, { Component } from 'react'
import { Button, Icon, Card, Input, Radio, Select, TextArea, Segment, Grid, Label } from 'semantic-ui-react'

class TransactionOTP extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Segment textAlign="center">
        <div className="mt-2 w-600 m-auto">
          <Card>
            <Card.Content>
              <Card.Header>OTP verification</Card.Header>
              <Card.Description></Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Input label="Type your received OTP" placeholder='0000' />
            </Card.Content>
            <Card.Content extra>
              <Button animated='fade' color="google plus" size='big'>
                <Button.Content visible>Submit</Button.Content>
                <Button.Content hidden>
                  <Icon name='arrow right' />
                </Button.Content>
              </Button>
            </Card.Content>
          </Card>
        </div>
      </Segment>
    )
  }
}

export default TransactionOTP
