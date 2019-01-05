import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import PaymentCard from './PaymentCard';

class ListPayment extends Component {
  render() {
    return (
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
          <Grid.Column>
            <PaymentCard
              index="4"
              number="96965427928476892576"
              balance="5555555"
            />
          </Grid.Column>
          <Grid.Column>
            <PaymentCard
              index="5"
              number="96965427928476892576"
              balance="5555555"
            />
          </Grid.Column>
          <Grid.Column>
            <PaymentCard
              index="6"
              number="96965427928476892576"
              balance="5555555"
            />
          </Grid.Column>
          <Grid.Column>
            <PaymentCard
              index="7"
              number="96965427928476892576"
              balance="5555555"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default ListPayment;