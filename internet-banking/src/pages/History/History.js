import React from 'react';
import HistoryList from '../../components/History/HistoryList';
import {
  Header,
  Icon
} from 'semantic-ui-react';

class HistoryPage extends React.Component {
  render() {

    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              History
              <Header.Subheader>History of your transactions</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <HistoryList />
        </div>
      </div>
    );
  }
}

export default HistoryPage;
