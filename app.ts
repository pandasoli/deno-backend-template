import { oak } from 'deps'
import DotEnv from '@utils/dotenv.ts'

import router from './routes.ts'


const app = new oak.Application()

app.use(router.routes())
app.use(router.allowedMethods())


app.addEventListener('error', e => {
  console.log('Error: ', e.error)
})

app.addEventListener('listen', e => {
  console.log(`Listening on http://${e.hostname}:${e.port}/`)
})

await app.listen({
  port: parseInt(await DotEnv('PORT')) || 8080
})
