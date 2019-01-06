import React, { Component } from 'react'
import { Step } from 'semantic-ui-react'

const steps = [
  {
    key: 1,
    title: "Payment",
    desc: "Select source-billing account"
  },
  {
    key: 2,
    title: "Recipient",
    desc: "Fill in the recipient information"
  },
  {
    key: 3,
    title: "Transaction",
    desc: "Enter transfer amount, transfer message contents"
  },
  {
    key: 4,
    title: "Confirm",
    desc: "Choose the form of payment & confirm"
  },
  {
    key: 5,
    title: "OTP",
    desc: "Fill OTP code to confirms the transaction"
  },
];

class TransactionStep extends Component {
  onChangeStep = (key) => {
    console.log(key);
  }
  getStepStatus = (key, step) => {
    if (key < step)
      return "completed";
    if (key === step)
      return "active";
    if (key > step)
      return "disabled";
  }

  render() {
    const { currentStep } = this.props;
    if (!currentStep) {
      currentStep = 1;
    }
    return (
      <Step.Group ordered size='mini'>
        {steps.map(s => (
          <Step
            key={s.key}
            active={this.getStepStatus(s.key, currentStep) === "active"}
            completed={this.getStepStatus(s.key, currentStep) === "completed"}
            disabled={this.getStepStatus(s.key, currentStep) === "disabled"}
            onClick={() => this.onChangeStep(s.key, currentStep)}
          >
            <Step.Content>
              <Step.Title>{s.title}</Step.Title>
              {/* <Step.Description>{s.desc}</Step.Description> */}
            </Step.Content>
          </Step>
        ))}
      </Step.Group>
    )
  }
}

export default TransactionStep
