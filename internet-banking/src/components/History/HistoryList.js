import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import HistoryItem from './HistoryItem';

class HistoryList extends Component {
  render() {
    return (
        <div>
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
            <HistoryItem />
        </div>
    )
  }
}

export default HistoryList;