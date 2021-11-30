import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import HomeRouters from "./home.routes"

const Routes: React.FC = () => {
    return(
        <BrowserRouter>
            <HomeRouters/>
        </BrowserRouter>
    )
}

export default Routes