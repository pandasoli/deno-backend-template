import { dotenv } from 'deps'


const DotEnv = async (name: string): Promise<string> => {
  let res: string | undefined

  // Using dotenv lib
  if (!res) {
    const data = await dotenv.config()

    if (data) {
      res = data[name]
    }
  }

  // Using Deno std
  if (!res) {
    res = Deno.env.get(name)
  }

  return res || ''
}


export default DotEnv
