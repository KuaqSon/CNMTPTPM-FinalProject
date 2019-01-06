import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import PaymentCard from './PaymentCard';
import { fetchPayment } from '../../actions/payment';
import { fetchUserData } from '../../actions/auth';
import { connect } from 'react-redux';

class ListPayment extends Component {
  constructor() {
    super();

    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    this.props.fetchUserData();
  }
  
  componentWillReceiveProps() {
    this.loadPayment();
  }

  loadPayment() {
    const { user } = this.props;
    this.props.fetchPayment({
      idUser: user._id
    });
  }

  render() {
    const { payments, fetchPaymentsStatus } = this.props;

    if (!fetchPaymentsStatus) {
      return (
        <Dimmer active inverted page>
          <Loader inverted content='Loading' />
        </Dimmer>
      )
    } else {
      return (
        <Grid>
          <Grid.Row columns={4}>
            {payments.map(p =>
              <Grid.Column key={payments.indexOf(p)}>
                  <PaymentCard
                    index={payments.indexOf(p)}
                    number={p.accountNumber}
                    balance={p.asset > 0 ? p.asset : 0}
                  />
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
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
    fetchUserData: () => dispatch(fetchUserData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPayment);