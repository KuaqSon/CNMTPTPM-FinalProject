import React, { Component } from 'react';
import { Icon, Card, Statistic } from 'semantic-ui-react';
import moment from 'moment';

class HistoryItem extends Component {
  render() {
    const {
      created,
      nameUserSend,
      nameUserReceive,
      transferMoney,
      isSend,
      note,
      accountNumber
    } = this.props;

    return (
      <Card link className="p-1"> 
        { isSend ? 
        <Statistic.Group widths='six' size="small">
          <Statistic>
            <Statistic.Value text>
            <Icon name="clock outline"/>
              {created.substring(0, 10)}<br />
              {created.substring(11, 16)}
            </Statistic.Value>
            <Statistic.Label>Time</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              {accountNumber}
            </Statistic.Value>
            <Statistic.Label>Payment card sent</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              ${transferMoney}
            </Statistic.Value>
            <Statistic.Label>Transaction</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Icon name='arrow right' />
            </Statistic.Value>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              <Icon name="user circle outline" />
              {nameUserReceive}
            </Statistic.Value>
            <Statistic.Label>Recipient</Statistic.Label>
          </Statistic>
          </Statistic.Group>
          :
          <Statistic.Group widths='six' size="small">
          <Statistic>
            <Statistic.Value text>
            <Icon name="clock outline"/>
              {created.substring(0, 10)}<br />
              {created.substring(11, 16)}
            </Statistic.Value>
            <Statistic.Label>Time</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              {accountNumber}
            </Statistic.Value>
            <Statistic.Label>Payment card sent</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Icon name='arrow left' />
            </Statistic.Value>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              ${transferMoney}
            </Statistic.Value>
            <Statistic.Label>Transaction</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              <Icon name="user circle outline" />
              {nameUserSend}
            </Statistic.Value>
            <Statistic.Label>Send from</Statistic.Label>
          </Statistic>

          </Statistic.Group>
          }
      </Card>
    )
  }
}

export default HistoryItem
