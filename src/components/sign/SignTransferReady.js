import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import FormButton from '../common/FormButton'
import MobileContainer from './MobileContainer'
import SignAnimatedArrow from './SignAnimatedArrow'
import SelectAccountDropdown from '../login/SelectAccountDropdown'
import Balance from '../common/Balance'

import { handleRefreshAccount, switchAccount } from '../../actions/account'

import { Grid, Form } from 'semantic-ui-react'

class SignTransferReady extends Component {
   state = {
      dropdown: false
   }

   handleOnClick = () => {
      this.setState({
         dropdown: !this.state.dropdown
      })
   }

   handleSelectAccount = accountId => {
      this.props.switchAccount(accountId)
      this.props.handleRefreshAccount(this.props.history)
   }

   redirectCreateAccount = () => {
      this.props.history.push('/create')
   }

   render() {
      const { appTitle, totalAmount, transferTransferring, handleAllow, handleDeny, account, handleDetails, sensitiveActionsCounter } = this.props
      const { dropdown } = this.state

      return (
         <MobileContainer>
            <Grid padded>
               <Grid.Row centered>
                  <Grid.Column
                     textAlign='center'
                     className='authorize'
                  >
                     <SignAnimatedArrow animate={transferTransferring}  />
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row className='title'>
                  <Grid.Column
                     className='h1'
                     textAlign='center'
                     computer={16}
                     tablet={16}
                     mobile={16}
                  >
                     <div className='font-bold'>{appTitle}</div> 
                     <div className='h2'>is requesting to transfer</div>
                     <div className='font-bold'><Balance amount={totalAmount} /></div>
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row centered>
                  <Grid.Column
                     largeScreen={12}
                     computer={14}
                     tablet={16}
                     className='cont'
                     textAlign='center'
                  >
                     <div 
                        className='more-information' 
                        onClick={() => handleDetails(true)}
                     >
                        More information
                        {sensitiveActionsCounter ? <div className='circle'>{sensitiveActionsCounter > 9 ? '9+' : sensitiveActionsCounter}</div> : ''}
                     </div>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
            <Grid padded>
               <Grid.Row centered>
                  <Grid.Column largeScreen={6} computer={8} tablet={10} mobile={16}>
                     <SelectAccountDropdown
                        handleOnClick={this.handleOnClick}
                        account={account}
                        dropdown={dropdown}
                        handleSelectAccount={this.handleSelectAccount}
                        redirectCreateAccount={this.redirectCreateAccount}
                     />
                  </Grid.Column>
               </Grid.Row>
               <Grid.Row centered className='but-sec'>
                  <Grid.Column largeScreen={6} computer={8} tablet={10} mobile={16}>
                     <Form onSubmit={handleAllow}>
                        <input
                           type='hidden'
                           name='accountId'
                           // value={account.accountId}
                        />

                        <FormButton
                           color='gray-white'
                           onClick={handleDeny}
                        >
                           DENY
                        </FormButton>

                        <FormButton
                           type='submit'
                           color='blue'
                        >
                           ALLOW
                        </FormButton>
                     </Form>
                  </Grid.Column>
               </Grid.Row>
            </Grid>
         </MobileContainer>
      )
   }
}

const mapDispatchToProps = {
   handleRefreshAccount,
   switchAccount,
}

const mapStateToProps = ({ account, sign }) => ({
   account,
   ...sign
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignTransferReady))
