import ExpressApi, { Express } from 'express'
import Routes from './Routes'
import Cors from 'cors'

import "./Database"

const api: Express = ExpressApi()

api.use(ExpressApi.json())
api.use(Cors())
api.use(Routes)
api.listen(7586, () => console.log("Api listening on port 7586"))