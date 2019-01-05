import React, { Component } from 'react'
import { Header, Image, Table, Button, Segment, Form, Input } from 'semantic-ui-react'

class NewClientForm extends Component {
  render() {
    return (
      <Segment className="w-600 m-auto">
        <Form>
          <Form.Group widths='equal'>
            <Form.Field
              id='form-input-control-first-name'
              control={Input}
              label='First name'
              placeholder='Enter your first name'
            />
            <Form.Field
              id='form-input-control-last-name'
              control={Input}
              label='Last name'
              placeholder='Enter your last name'
            />
          </Form.Group>
          <Form.Field
            id='form-textarea-control-email'
            control={Input}
            label='Email'
            placeholder='sample@mail.com'
          />
          <Form.Field
            id='form-textarea-control-phone'
            control={Input}
            label='Phone'
            placeholder='Enter your phone number'
          />
          <Form.Field
            id='form-button-control-save'
            control={Button}
            content='Save'
          />
        </Form>
      </Segment>
    )
  }
}

export default NewClientForm
