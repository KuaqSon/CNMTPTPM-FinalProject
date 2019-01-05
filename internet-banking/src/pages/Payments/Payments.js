import React, { Component } from 'react';
import ListPayment from '../../components/Payment/ListPayment';
import {
  Header,
  Icon
} from 'semantic-ui-react'

class Payments extends Component {
  render() {

    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              Payments
              <Header.Subheader>List of your payment method</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <ListPayment />
        </div>
      </div>
    );
  }
}

export default Payments;
