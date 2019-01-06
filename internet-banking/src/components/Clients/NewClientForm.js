import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addClient } from '../../actions/clients';
import { withRouter } from 'react-router-dom'
import { Dimmer, Icon, Loader, Button, Segment, Form, Input } from 'semantic-ui-react';

class NewClientForm extends Component {
  state = { name: '', email: '', username: '', password: '', phone: '', loading: false }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, email, username, password, phone } = this.state;
    if (name === '' || email === '' || username === '' || password === '' || phone === '') {
      return;
    }
    this.setState({loading: true});
    this.props.addClient({
      name: name,
      email: email,
      username: username,
      password: password,
      phoneNumber: phone
    })
      .then(data => this.props.history.push("/dashboard/clients"))
      .catch(error => console.log("fail"));
  }

  render() {
    const { name, email, username, password, phone, loading } = this.state;
    if (loading) {
      return (
        <Dimmer active inverted className="h-300">
          <Loader inverted content='Loading'  />
        </Dimmer>
      )
    } else {
      return (
        <Segment className="w-600 m-auto">
          <Form>
            <Form.Group widths='equal'>
              <Form.Input
                name='username'
                value={username}
                label='Username'
                placeholder='Enter username'
                onChange={this.handleChange}
              />
              <Form.Input
                name='password'
                value={password}
                label='Password'
                placeholder='Enter password'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input
                name='name'
                value={name}
                label='Full name'
                placeholder='Enter your name'
                onChange={this.handleChange}
              />
              <Form.Input
                name='phone'
                value={phone}
                label='Phone'
                placeholder='Enter your phone number'
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Input
              name='email'
              value={email}
              label='Email'
              placeholder='sample@mail.com'
              onChange={this.handleChange}
            />
            <Button animated='fade' onClick={() => this.handleSubmit()}>
              <Button.Content visible>Submit</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
          </Form>
        </Segment>
      )
    }
  }
}
const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    addClient: data => dispatch(addClient(data))
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewClientForm));
