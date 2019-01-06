import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import HistoryItem from './HistoryItem';
import { connect } from 'react-redux';
import { fetchHistory } from '../../actions/historyTransaction';

class HistoryList extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchHistory('159263478');

  }
  render() {
    console.log(this.props.histories);
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

const mapStateToProps = (state) => {
  return {
    histories: state.histories.data,
    fetchHistoryStatus: state.histories.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHistory: () => dispatch(fetchHistory())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryList);