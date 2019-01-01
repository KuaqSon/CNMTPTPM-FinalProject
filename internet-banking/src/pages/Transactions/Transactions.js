import React from 'react';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react';

class Transactions extends React.Component {
  render() {

    return (
      <div>
        Transaction work!

        <div>
          <Dimmer active inverted>
            <Loader active size='big'>Loading</Loader>
          </Dimmer>
        </div>
      </div>
    );
  }
}

export default Transactions;
