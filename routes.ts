import { oak } from './deps.ts'

import MainRouter from '@routes/main.ts'


const router = new oak.Router()

router.use(MainRouter.routes(), MainRouter.allowedMethods())


export default router
