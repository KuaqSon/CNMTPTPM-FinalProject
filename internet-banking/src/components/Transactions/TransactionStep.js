import React, { Component } from 'react'
import { Step } from 'semantic-ui-react'

class TransactionStep extends Component {
  render() {
    return (
      <Step.Group ordered size='tiny'>
        <Step completed>
          <Step.Content>
            <Step.Title>Payment</Step.Title>
            <Step.Description>Select source-billing account</Step.Description>
          </Step.Content>
        </Step>
    
        <Step completed>
          <Step.Content>
            <Step.Title>Recipient</Step.Title>
            <Step.Description>Fill in the recipient information</Step.Description>
          </Step.Content>
        </Step>

        <Step completed>
          <Step.Content>
            <Step.Title>Transaction</Step.Title>
            <Step.Description>Enter transfer amount, transfer message contents</Step.Description>
          </Step.Content>
        </Step>

        <Step active>
          <Step.Content>
            <Step.Title>Confirm</Step.Title>
            <Step.Description>Choose the form of payment & confirm</Step.Description>
          </Step.Content>
        </Step>
        <Step disabled>
          <Step.Content>
            <Step.Title>OTP</Step.Title>
            <Step.Description>Fill OTP code to confirms the transaction</Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>
    )
  }
} 

export default TransactionStep
