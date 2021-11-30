import React from 'react'

import {
    Switch, 
    Route, 
    Redirect 
} from 'react-router-dom'

import { validateWebToken } from '../Services/validateWebtoken'

import AsignedPlans from '../Pages/AsignedPlans'
import Payments from '../Pages/Payments'
import UserBots from '../Pages/UserBots'
import SupportAssistant from '../Pages/SupportAssistant'

const PrivateRoute = ({component: Component, ...rest}: React.ComponentProps<any>) => (
    <Route { ...rest } render={ props => 
        (validateWebToken().isValid)?
            <Component {...props} />
        :
            <Redirect to={{ pathname: '/', state: { from: props.location }}} />
    }/>
)

const Routes: React.FC = () => {
    return(
        <Switch>
            <PrivateRoute path="/client-area/user-plans" component={ AsignedPlans }/>
            <PrivateRoute path="/client-area/payments"   component={ Payments }/>
            <PrivateRoute path="/client-area/user-bots"  component={ UserBots }/>
            <PrivateRoute path="/client-area/support"    component={ SupportAssistant }/>
            <Route path="/client-area/*" render={ props => <Redirect to={{ pathname: '/client-area', state: props.location }} /> }/>
        </Switch>
    )
}

export default Routes