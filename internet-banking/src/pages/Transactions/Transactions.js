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
import TransactionPayer from '../../components/Transactions/TransactionPayer';
import TransactionConfirm from '../../components/Transactions/TransactionConfirm';
import TransactionOTP from '../../components/Transactions/TransactionOTP';
import { connect } from 'react-redux';
import { fetchUserData } from '../../actions/auth';


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

  componentDidMount() {
    this.props.fetchUserData();
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
    const { user, sendCard, recipientCard, infor, payer } = this.props;
    const {_id} = user;

    console.log("step 1:", sendCard);
    console.log("step 2:", recipientCard);
    console.log("step 3:", infor);
    console.log("step 4:", payer);
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
          <TransactionPayer />}
          { currentStep === 5 &&
          <TransactionConfirm 
            idUser={_id}
            sendCardNumber={sendCard.cardNumber}
            recipientCardNumber={recipientCard.cardNumber}
            amount={infor.amount}
            message={infor.message}
            isPayer={payer}
          />}
          { currentStep === 6 &&
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
              { currentStep < 6  && 
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
    user: state.auth.data,
    sendCard: state.transaction.sendCard,
    recipientCard: state.transaction.recipientCard,
    infor: state.transaction.infor,
    payer: state.transaction.payer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserData: () => dispatch(fetchUserData())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

