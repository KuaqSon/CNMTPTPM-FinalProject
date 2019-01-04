import React, { Component } from 'react'
import { Button, Icon, Card, Input, Radio, Select, TextArea, Segment, Grid } from 'semantic-ui-react'

class TransactionConfirm extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
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
                    <Button inverted color='violet'>Select</Button>
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
                    <Button inverted color='brown'>Select</Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div className="mt-3">
            <Button animated color="google plus" size='big'>
              <Button.Content visible>Confirm</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </div>
        </div>
      </Segment>
    )
  }
}

export default TransactionConfirm
