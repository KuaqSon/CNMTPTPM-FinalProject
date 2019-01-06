import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addClient } from '../../actions/clients';
import { withRouter } from 'react-router-dom'
import { Dimmer, Icon, Loader, Button, Segment, Form, Input } from 'semantic-ui-react';

class NewRecipientForm extends Component {
  state = { name: '', number: '', loading: false }
  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const { name, email, username, password, phone } = this.state;
    if (name === '' || email === '' || username === '' || password === '' || phone === '') {
      return;
    }
    this.setState({ loading: true });
    // this.props.addClient({
    //   name: name,
    //   email: email,
    //   username: username,
    //   password: password,
    //   phoneNumber: phone
    // })
    //   .then(data => this.props.history.push("/dashboard/clients"))
    //   .catch(error => console.log("fail"));
  }

  render() {
    const { name, number, loading } = this.state;
    if (loading) {
      return (
        <Dimmer active inverted className="h-300">
          <Loader inverted content='Loading' />
        </Dimmer>
      )
    } else {
      return (
        <Segment className="w-600 m-auto">
          <Form>
            <Form.Input
              name='number'
              value={number}
              label='Account Number'
              placeholder='xxxx-xxxx-xxxx-xxxx'
              type="number"
              onChange={this.handleChange}
            />
            <Button animated='fade' onClick={() => this.handleSubmit()}>
              <Button.Content visible>Search</Button.Content>
              <Button.Content hidden>
                <Icon name='search' />
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
)(NewRecipientForm));
