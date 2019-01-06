import React, { Component } from 'react';
import { Grid, Dimmer, Loader } from 'semantic-ui-react';
import HistoryItem from './HistoryItem';
import { connect } from 'react-redux';
import { fetchHistory } from '../../actions/historyTransaction';
import { fetchUserData } from '../../actions/auth';

class HistoryList extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    this.props.fetchUserData()
    this.loadHistory();
  }

  loadHistory() {
    const {user} = this.props;
    const {_id} = user;
    this.props.fetchHistory({
      idUser: _id
    });
  }
  render() {
    const {histories, fetchHistoryStatus, user} = this.props;
    const {_id} = user;
    console.log(histories);


    if(!fetchHistoryStatus) {
      return (
        <Dimmer active inverted>
          <Loader inverted content='Loading' />
        </Dimmer>
      )
    } else {
      return (
        <div>
        {histories.map(h => 
          <HistoryItem 
           key={histories.indexOf(h)}
           created={h.created}
           nameUserSend={h.nameUserSend}
           nameUserReceive={h.nameUserReceive}
           transferMoney={h.transferMoney}
          isSend={h.idUserSend === _id}
          note={h.infor}
          accountNumber={h.accountNumber}
          />
        )}
      </div>
    )
  }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.data,
    histories: state.histories.data,
    fetchHistoryStatus: state.histories.status
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(fetchUserData()),
    fetchHistory: data => dispatch(fetchHistory(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryList);