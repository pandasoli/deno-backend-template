import { djwt } from 'deps'


const key = await crypto.subtle.generateKey(
  { name: 'HMAC', hash: 'SHA-512' },
  true,
  [ 'sign', 'verify' ]
)


export const create = async (payload: djwt.Payload): Promise<string> => {
  return await djwt.create(
    { alg: 'HS512', typ: 'JWT' },
    payload,
    key
  )
}

export const verify = async (jwt: string): Promise<djwt.Payload> => {
  return await djwt.verify(jwt, key)
}
