import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader, Modal, Button, Input, Form } from 'semantic-ui-react';
import PaymentCard from '../Payment/PaymentCard';
import { fetchPayment, rechargePayment } from '../../actions/payment';

class RechargeForm extends Component {
  constructor() {
    super();

    this.state = {
      recharge: '',
      loading: false,
      modalVisible: false,
      modalSuccessVisible: false,
      selectedNumber: '',
      selectedId: ''
    };
  }

  componentWillMount() {
    this.loadPayment();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  loadPayment() {
    this.props.fetchPayment({
      idUser: this.props.clientId
    });
  }

  closeModal = () => this.setState({ modalVisible: false })
  closeSuccess = () => {
    this.setState({
      modalSuccessVisible: false,
      recharge: '',
      selectedNumber: '',
      selectedId: ''
    });
    this.loadPayment();
  }

  showModalRecharge = (id, number) => {
    this.setState({
      modalVisible: true,
      selectedNumber: number,
      selectedId: id,
    })
  }

  submitRecharge = (id) => {
    if (id === '') {
      return;
    }

    this.setState({
      loading: true,
      modalVisible: false,
      modalSuccessVisible: true
    })

    this.props.rechargePayment({
      accountId: id,
      asset: this.state.recharge
    })
      .then(data => {
        this.setState({
          loading: false
        })
      })
      .catch(error => {
        this.setState({
          loading: false
        })
        console.log("fail")
      });
  }

  render() {
    const { payments, fetchPaymentsStatus } = this.props;
    const { recharge, modalVisible, modalSuccessVisible, loading } = this.state;

    if (!fetchPaymentsStatus) {
      return (
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      )
    } else {
      return (
        <div>
          <Modal
            dimmer="blurring"
            size="tiny"
            open={modalVisible}
            closeOnDimmerClick={false}
            onClose={this.closeModal}
          >
            <Modal.Header>Recharge into {this.state.selectedNumber}</Modal.Header>
            <Modal.Content>
              <Form>
                <Form.Input
                  name='recharge'
                  value={recharge}
                  label='Type number of recharge'
                  placeholder='0.00'
                  type="number"
                  onChange={this.handleChange}
                />
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.closeModal} negative>
                No
            </Button>
              <Button
                onClick={() => this.submitRecharge(this.state.selectedId)}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Yes'
              />
            </Modal.Actions>
          </Modal>

          <Modal
            dimmer="blurring"
            size="tiny"
            open={modalSuccessVisible}
            closeOnDimmerClick={false}
            onClose={this.closeSuccess}
          >
            <Modal.Header>Success!</Modal.Header>
            <Modal.Content>
              {loading ?
                <Dimmer active inverted>
                  <Loader inverted content='Loading' inline='centered' />
                </Dimmer>
                :
                <p>Added <strong>${this.state.recharge}</strong> to payment <strong>{this.state.selectedNumber}</strong></p>
              }
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => this.closeSuccess()}
                positive
                labelPosition='right'
                icon='checkmark'
                content='Ok'
              />
            </Modal.Actions>
          </Modal>

          <Grid>
            <Grid.Row columns={4}>
              {payments.map(p =>
                <Grid.Column key={payments.indexOf(p)}>
                  <div onClick={() => this.showModalRecharge(p._id, p.accountNumber)}>
                    <PaymentCard
                      index={payments.indexOf(p)}
                      number={p.accountNumber}
                      balance={p.asset > 0 ? p.asset : 0}
                    />
                  </div>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    payments: state.payment.data,
    fetchPaymentsStatus: state.payment.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPayment: data => dispatch(fetchPayment(data)),
    rechargePayment: data => dispatch(rechargePayment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RechargeForm);