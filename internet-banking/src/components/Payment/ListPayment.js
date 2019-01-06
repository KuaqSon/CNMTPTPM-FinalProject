import React, { Component } from 'react';
import { Grid, Dimmer, Loader, Modal, Button, Message } from 'semantic-ui-react';
import PaymentCard from './PaymentCard';
import { fetchPayment, negativePayment } from '../../actions/payment';
import { fetchUserData } from '../../actions/auth';
import { connect } from 'react-redux';

class ListPayment extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isError: false,
      modalVisible: false,
      modalSuccessVisible: false,
      selectedNumber: '',
      selectedBalance: '',
      selectedId: ''
    };
  }

  componentDidMount() {
    this.props.fetchUserData();
    this.loadPayment();
  }

  loadPayment() {
    const { user } = this.props;
    this.props.fetchPayment({
      idUser: user._id
    });
  }

  closeModal = () => this.setState({ modalVisible: false })
  closeSuccess = () => {
    this.setState({
      modalSuccessVisible: false,
      recharge: '',
      selectedNumber: '',
      selectedBalance: '',
      selectedId: ''
    });
    this.loadPayment();
  }

  showModalDetail = (id, number, balance) => {
    this.setState({
      modalVisible: true,
      selectedNumber: number,
      selectedBalance: balance,
      selectedId: id,
    })
  }

  submitClosePayment = (id) => {
    if (id === '') {
      return;
    }
    
    this.setState({
      loading: true,
      modalVisible: false,
      modalSuccessVisible: true
    })

    this.props.negativePayment({
      idPayment: id
    })
    .then(data => {
      const {isError} = data;
      if(isError) {
        this.setState({
          isError: true,
          modalSuccessVisible: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    }).catch(error => console.log("fail"))  
    
    // this.props.rechargePayment({
    //   accountId: id,
    //   asset: this.state.recharge
    // })
    //   .then(data => {
    //     this.setState({
    //       loading: false
    //     })
    //   })
    //   .catch(error => {
    //     this.setState({
    //       loading: false
    //     })
    //     console.log("fail")
    //   });

  }

  render() {
    const { payments, fetchPaymentsStatus } = this.props;
    const { modalVisible, modalSuccessVisible, loading, isError } = this.state;
    console.log(payments);

    if (!fetchPaymentsStatus) {
      return (
        <Dimmer active inverted page>
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
            onClose={this.closeModal}
          >
            <Modal.Header>Payment infor</Modal.Header>
            <Modal.Content>
              <div>
                <p>Account number: <strong>{this.state.selectedNumber}</strong></p>
                <p>Balance: <strong>{this.state.selectedBalance}</strong></p>
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => this.submitClosePayment(this.state.selectedId)}
                negative
                labelPosition='right'
                icon='close'
                content='Close this payment account'
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
                <p>Closed payment <strong>{this.state.selectedNumber}</strong></p>
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
          { isError &&
            <Message color="orange">This payment is still have money, can't close it!</Message>}
          <Grid>
            <Grid.Row columns={4}>
              {payments.map(p =>
                <Grid.Column key={payments.indexOf(p)}>
                  <div onClick={() => this.showModalDetail(p._id, p.accountNumber, p.asset)}>
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
    user: state.auth.data,
    payments: state.payment.data,
    fetchPaymentsStatus: state.payment.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPayment: data => dispatch(fetchPayment(data)),
    fetchUserData: () => dispatch(fetchUserData()),
    negativePayment: data => dispatch(negativePayment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPayment);