import React, { Component } from 'react'
import { Card, Feed } from 'semantic-ui-react'

class PaymentCard extends Component {
  render() {
    const index = this.props.index ? this.props.index : "";
    const number = this.props.number ? this.props.number : "";
    const balance = this.props.balance ? this.props.balance : "";

    return (
      <Card link color='blue' className="mt-2">
        <Card.Content>
          <Card.Header>{number}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Content>
                <Feed.Summary>
                  {balance}
                </Feed.Summary>
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Card.Content>
      </Card>
    )
  }
}

export default PaymentCard;