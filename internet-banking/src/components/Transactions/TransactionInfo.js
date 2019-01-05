import React, { Component } from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea, Segment } from 'semantic-ui-react'

class TransactionInfor extends Component {
  state = {}

  handleChange = (e, { value }) => this.setState({ value })

  render() {
    const { value } = this.state
    return (
      <Segment>
        <div className="mt-2">
          <Form className="w-600 m-auto">
            <Form.Group>
              <Form.Field control={Input} label='Amount' placeholder='0.00' icon='dollar' type="number"/>
            </Form.Group>
            <Form.Field control={TextArea} label='Message' placeholder='Type message for your transfer' />
            <Form.Field control={Button}>Submit</Form.Field>
          </Form>
        </div>
      </Segment>
    )
  }
}

export default TransactionInfor
