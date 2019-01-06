import React, { Component } from 'react';
import { Grid, Dimmer, Loader, Modal, Button, Message } from 'semantic-ui-react';
import PaymentCard from '../Payment/PaymentCard';
import { fetchPayment, negativePayment } from '../../actions/payment';
import { fetchUserData } from '../../actions/auth';
import { connect } from 'react-redux';
import { setSendCard } from '../../actions/transaction';

class SelectCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isError: false,
      modalVisible: false,
      isSelectedCard: false,
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

  chooseAnotherCard = () => {
    this.setState({
      isSelectedCard: false,
      selectedNumber: '',
      selectedBalance: '',
      selectedId: '',
    })
  }

  submitChoosePayment = (number) => {
    
    this.setState({
      // loading: true,
      modalVisible: false,
      isSelectedCard: true
    })

    this.props.setSendCard({
      cardNumber: number
    })
    
  }

  render() {
    const { payments, fetchPaymentsStatus } = this.props;
    const { modalVisible, selectedNumber, loading, isError, selectedBalance, isSelectedCard } = this.state;
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
        <Dimmer active={loading} inverted page>
          <Loader inverted content='Loading' />
        </Dimmer>
          <Modal
            dimmer="blurring"
            size="tiny"
            open={modalVisible}
            onClose={this.closeModal}
          >
            <Modal.Header>Choose this payment account to make the transaction?</Modal.Header>
            <Modal.Content>
              <div>
                <p>Account number: <strong>{selectedNumber}</strong></p>
                <p>Balance: <strong>${selectedBalance}</strong></p>
              </div>
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => this.submitChoosePayment(selectedNumber)}
                negative
                labelPosition='right'
                icon='check'
                content='Ok'
              />
            </Modal.Actions>
          </Modal>
          
          <Grid>
            { isSelectedCard && 
              <Grid.Row columns={4}>
              <Grid.Column>
                <PaymentCard
                  number={selectedNumber}
                  balance={selectedBalance > 0 ? selectedBalance : 0}
                />
              </Grid.Column>
              <Grid.Column>
                <div className="mt-2">
                <Button
                  onClick={() => this.chooseAnotherCard()}
                  icon='credit card outline'
                  content='Choose another payment card'
                />
                </div>
              </Grid.Column>
              </Grid.Row>
            }
            <Grid.Row columns={4}>
              { !isSelectedCard && payments.map(p =>
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
    setSendCard: data => dispatch(setSendCard(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectCard);