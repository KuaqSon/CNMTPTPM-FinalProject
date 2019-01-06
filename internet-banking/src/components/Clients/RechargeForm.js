import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import PaymentCard from '../Payment/PaymentCard';
import { fetchPayment } from '../../actions/payment';

class RechargeForm extends Component {


  componentWillMount() {
    this.props.fetchPayment({
      idUser: this.props.clientId
    });
  }

  render() {
    const { payments, fetchPaymentsStatus } = this.props;

    if (!fetchPaymentsStatus) {
      return (
        <Dimmer active inverted>
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
    payments: state.payment.data,
    fetchPaymentsStatus: state.payment.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPayment: data => dispatch(fetchPayment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RechargeForm);