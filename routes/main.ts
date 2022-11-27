import { oak } from 'deps'
const { Router } = oak

import * as MainController from '@controllers/main.ts'


const router = new Router()
  .get('/', MainController.main)


export default router
