import { oak } from 'deps'


export const main = async (ctx: oak.Context) => {
  ctx.response.body = 'Hello, World!'
}
