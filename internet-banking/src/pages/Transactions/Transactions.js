import React from 'react';
import {
  Header,
  Icon,
  Step,
  Button
} from 'semantic-ui-react';
import TransactionStep from '../../components/Transactions/TransactionStep';
import SelectCard from '../../components/Transactions/SelectCard';
import RecipientInfo from '../../components/Transactions/RecipientInfo';
import TransactionInfor from '../../components/Transactions/TransactionInfo';
import TransactionConfirm from '../../components/Transactions/TransactionConfirm';
import TransactionOTP from '../../components/Transactions/TransactionOTP';
import { connect } from 'react-redux';

class Transactions extends React.Component {
  constructor() {
    super();

    this.state = {
      currentStep: 1,
      loading: false,
      modalVisible: false,
      modalSuccessVisible: false,
      selectedClient: '',
      selectedId: ''
    };
  }

  gotoNextStep = () => {
    const next = this.state.currentStep + 1;
    if(next > 5) {
      return;
    }
    this.setState({
      currentStep: next
    })
  }

  gotoPreStep = () => {
    const pre = this.state.currentStep - 1;
    if(pre < 1) {
      return;
    }
    this.setState({
      currentStep: pre
    })
  }

  render() {
    const { currentStep } = this.state;
    const { sendCard, recipientCard, infor } = this.props;

    console.log("step 1:", sendCard);
    console.log("step 2:", recipientCard);
    console.log("step 3:", infor);
    return (
      <div>
        <div className="p-1">
          <Header as='h2'>
            <Icon name='settings' />
            <Header.Content>
              Transactions
              <Header.Subheader>Making a transactions</Header.Subheader>
            </Header.Content>
          </Header>
        </div>
        <div style={{ marginTop: '2em', marginBottom: '1em' }}>
          <TransactionStep currentStep={currentStep}/>
          { currentStep === 1 &&
          <SelectCard />}
          { currentStep === 2 &&
          <RecipientInfo />}
          { currentStep === 3 &&
          <TransactionInfor />}
          { currentStep === 4 &&
          <TransactionConfirm />}
          { currentStep === 5 &&
          <TransactionOTP />}
        </div>
        <div className="mt-3">
              { currentStep > 1 && 
              <Button animated='fade' inverted color='violet' onClick={() => this.gotoPreStep()}>
                <Button.Content visible>Back</Button.Content>
                <Button.Content hidden>
                <Icon name='arrow left' />
                </Button.Content>
              </Button>}
              { currentStep < 5 && 
              <Button animated='fade' inverted color='violet' onClick={() => this.gotoNextStep()}>
                <Button.Content visible>Next</Button.Content>
                <Button.Content hidden>
                <Icon name='arrow right' />
                </Button.Content>
              </Button>}
            </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sendCard: state.transaction.sendCard,
    recipientCard: state.transaction.recipientCard,
    infor: state.transaction.infor
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

