import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Button, Form, Grid, Header, Dimmer, Message, Segment, Loader } from 'semantic-ui-react';
import Recaptcha from 'react-recaptcha';
class Login extends Component {
  constructor() {
    super();
    this.recaptchaLoaded = this.recaptchaLoaded.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);


    this.state = {
      loading: false,
      error: false,
      username: '',
      password: ''
    };
  }

  recaptchaLoaded() {
    console.log('capcha successfully loaded');
  }

  handleSubscribe() {
    if (this.state.isVerified) {
      alert('You have successfully subscribed!');
    } else {
      alert('Please verify that you are a human!');
    }
  }


  verifyCallback(response) {
    if (response) {
      this.setState({
        isVerified: true
      })
    }
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    document.body.appendChild(script);
  }

  componentWillMount() {
    // const {authSatus} = this.props;
    // console.log(authSatus);
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleLogin = () => {
    const { username, password } = this.state;
    this.setState({
      loading: true,
      error: false
    })

    this.props.login({
      username,
      password
    })
      .then(data => {
        const { isError } = data;
        if (isError) {
          this.setState({
            loading: false,
            error: true,
          })
        } else {
          this.setState({
            loading: false
          });
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          error: true,
        })
        console.log("fail")
      });
  }

  render() {
    const { loading, error, username, password } = this.state;

    if (loading) {
      return (
        <Dimmer active inverted page>
          <Loader inverted content='Loading' />
        </Dimmer>
      )
    } else {
      return (
        <div className='login-form mt-3'>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Log-in to your account
        </Header>
              <Form size='large' className="mt-2">
                <Segment stacked textAlign="left">
                  <Form.Input
                    fluid
                    icon='user'
                    label='Username:'
                    iconPosition='left'
                    placeholder='Username'
                    name='username'
                    value={username}
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    label='Password:'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                    value={password}
                    onChange={this.handleChange}
                  />

                  <Button color='teal' fluid size='large' onClick={() => this.handleLogin()}>
                    Login
                </Button>
                </Segment>
                

                <Segment>
                <div
                  className="convert"
                  onClick={this.handleSubscribe}
                >Subscribe</div>

                <Recaptcha
                  sitekey="6Ld1pIUUAAAAAN6-ntR1wmaaSrq4_7TNXqfU3qEU"
                  render="explicit"
                  onloadCallback={this.recaptchaLoaded}
                  verifyCallback={this.verifyCallback}
                />
                </Segment>

            </Form>
            {error && <Message color='orange'>
              Invalid username or password
            </Message>}
          </Grid.Column>
        </Grid>
      </div >
    )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    // authSatus: state.auth.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: data => dispatch(login(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);