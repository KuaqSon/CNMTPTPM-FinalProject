import React, { Component } from 'react'
import { Form, Divider, Segment, Card, Button, Image } from 'semantic-ui-react'

class RecipientInfo extends Component {
  state = { name: '', email: '', submittedName: '', submittedEmail: '', submittedNumber: '' }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, email, number } = this.state

    this.setState({ submittedName: name, submittedEmail: email, submittedNumber: number })
  }

  render() {
    const { name, email, submittedName, submittedEmail, number } = this.state

    return (
      <Segment textAlign='center'>
      <div className="mt-2">
        <Form onSubmit={this.handleSubmit} className="mb-2">
          <Form.Group unstackable>
            <Form.Input label="Enter recipient's account number" placeholder='123456789' name='number' value={number} onChange={this.handleChange} width={6} className="m-auto"/>
            {/* <Form.Input
              placeholder='Email'
              name='email'
              value={email}
              onChange={this.handleChange}
            /> */}
        </Form.Group>
            <Form.Button content='Search' />
        </Form>
        {/* <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, email }, null, 2)}</pre>
        <strong>onSubmit:</strong>
      <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre> */}

        <Divider horizontal>Recipient</Divider>
        <Card className="w-400 m-auto">
      <Card.Content>
        {/* <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' /> */}
        <Card.Header>Molly Thomas</Card.Header>
        <Card.Description>
          <strong>423423423423423</strong>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
      </div>
      </Segment>
    )
  }
}

export default RecipientInfo
