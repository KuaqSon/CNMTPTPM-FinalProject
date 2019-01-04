import React from 'react';
import {
  Header,
  Icon
} from 'semantic-ui-react';
import TransactionStep from '../../components/Transactions/TransactionStep';
import SelectCard from '../../components/Transactions/SelectCard';

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
          <TransactionStep />
          <SelectCard />
        </div>
      </div>
    );
  }
}

export default Transactions;
