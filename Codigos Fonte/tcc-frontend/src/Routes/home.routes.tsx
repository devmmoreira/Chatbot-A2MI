import React from 'react'

import { 
    Switch, 
    Route, 
    Redirect 
} from 'react-router-dom'

import { validateWebToken } from '../Services/validateWebtoken'

import HomePage from '../Pages/HomePage'
import Contacts from '../Pages/Contacts'
import Products from '../Pages/Products'
import AboutUs from '../Pages/AboutUs'
import ClientArea from '../Pages/ClientArea'

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
            <Route path="/"             exact component={ HomePage }/>
            <Route path="/contacts"           component={ Contacts }/>
            <Route path="/about-us"           component={ AboutUs }/>
            <Route path="/services"           component={ Products }/>
            <PrivateRoute path="/client-area" exatct component={ ClientArea }/>
            <Route path="*" render={ props => <Redirect to={{ pathname: '/', state: props.location }} /> }/>
        </Switch>
    )
}

export default Routes