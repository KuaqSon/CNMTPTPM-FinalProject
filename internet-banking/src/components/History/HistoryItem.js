import React, { Component } from 'react'
import { Icon, Card, Statistic } from 'semantic-ui-react'

class HistoryItem extends Component {
  render() {
    return (
      <Card link className="p-1">
        <Statistic.Group widths='six' size="small">
          <Statistic>
            <Statistic.Value text>
            <Icon name="clock outline"/>
              22/12 <br />
              2020
            </Statistic.Value>
            <Statistic.Label>Time</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              1232132 <br />
              1321321
            </Statistic.Value>
            <Statistic.Label>Payment card sent</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              $5000
            </Statistic.Value>
            <Statistic.Label>Transaction</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Icon name='arrow right' />
            </Statistic.Value>
          </Statistic>

          <Statistic>
            <Statistic.Value>
              <Icon name="user circle outline" />
              Tran A
            </Statistic.Value>
            <Statistic.Label>Recipient</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value text>
              1232132 <br />
              6666666
            </Statistic.Value>
            <Statistic.Label>Recipient's payment</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </Card>
    )
  }
}

export default HistoryItem
