import React, { Component } from 'react';
import { Card, Feed, Grid } from 'semantic-ui-react';
import PaymentCard from '../Payment/PaymentCard';


class SelectCard extends Component {
  render() {

    return (
      <div>
        <Grid>
          <Grid.Row columns={4}>
            <Grid.Column>
              <PaymentCard
                index="1"
                number="96965427928476892576"
                balance="5555555"
              />
            </Grid.Column>
            <Grid.Column>
              <PaymentCard
                index="2"
                number="96965427928476892576"
                balance="5555555"
              />
            </Grid.Column>
            <Grid.Column>
              <PaymentCard
                index="3"
                number="96965427928476892576"
                balance="5555555"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default SelectCard;