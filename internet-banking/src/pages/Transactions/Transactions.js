import React from 'react';
import {
  Header,
  Icon,
  Step
} from 'semantic-ui-react';
import TransactionStep from '../../components/Transactions/TransactionStep';
import SelectCard from '../../components/Transactions/SelectCard';
import RecipientInfo from '../../components/Transactions/RecipientInfo';
import TransactionInfor from '../../components/Transactions/TransactionInfo';
import TransactionConfirm from '../../components/Transactions/TransactionConfirm';
import TransactionOTP from '../../components/Transactions/TransactionOTP';

class Transactions extends React.Component {
  render() {

    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              Transactions
              <Header.Subheader>Making a transactions</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <TransactionStep currentStep={2}/>
          <SelectCard />
          <RecipientInfo />
          <TransactionInfor />
          <TransactionConfirm />
          <TransactionOTP />
        </div>
      </div>
    );
  }
}

export default Transactions;
