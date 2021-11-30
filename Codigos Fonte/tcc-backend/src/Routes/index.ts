import { Router } from 'express'

import UsersRouters from './user.routes'
import AssistantRouter from './assistant.routes'
import EmailRouter from './email.routes'
import ProductRoutes from './product.routes'
import PaymentRoutes from './payment.routes'

const ApiRouters = Router()

ApiRouters.use('/users', UsersRouters) 
ApiRouters.use('/wtBot', AssistantRouter)
ApiRouters.use('/email', EmailRouter)
ApiRouters.use('/products', ProductRoutes)
ApiRouters.use('/payment', PaymentRoutes)

export default ApiRouters