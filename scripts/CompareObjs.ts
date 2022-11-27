type Res = {
  status: number
  msg: string
}

export type AnyObj = {
  [key: string]: any
}


function CompareObjs(obj: AnyObj, model: AnyObj, path = ''): Res
{
  const makeRes = (key: string, code: number, expected = '', received = '') => {
    return {
      status: code,
      msg: errMsg(key, code, expected, received)
    }
  }

  const errMsg = (key: string, code: number, expected = '', received = '') => {
    return (
      code === 1
        ? `Wrong key type, expected ${expected} and received ${received}`
        :
      code === 2
        ? 'Missing key'
        :
      code === 3
        ? `Type '${received}' is not supported yet`
        :
      code === 4
        ? `Empty key`
        : ''
    ) +
    ` at: ${path || '$'} > ${key}`
  }

  for (const key in model) {
    const val = model[key]

    if (typeof val === 'string') {
      if (/^(#?)string(\??)$/.test(val)) {
        const type = typeof obj[key]

        if (val.includes('?')) {
          if (!['undefined', 'string'].includes(type)) {
            return makeRes(key, 2)
          }
        }
        else if (type !== 'string') {
          return makeRes(key, 1, 'string', type)
        }

        if (val.includes('#')) {
          if (!obj[key]) {
            return makeRes(key, 4)
          }
        }
      }
      else if (/^number(\??)$/.test(val)) {
        if (val.endsWith('?')) {
          if (!['undefined', 'number'].includes(typeof obj[key])) {
            return makeRes(key, 2)
          }
        }
        else {
          const type = typeof obj[key]

          if (type !== 'number') {
            return makeRes(key, 1, 'number', type)
          }
        }
      }
      else if (/^boolean(\??)$/.test(val)) {
        if (val.endsWith('?')) {
          if (!['undefined', 'boolean'].includes(typeof obj[key])) {
            return makeRes(key, 2)
          }
        }
        else {
          const type = typeof obj[key]

          if (type !== 'boolean') {
            return makeRes(key, 1, 'boolean', type)
          }
        }
      }
      else if (/^any(\??)$/.test(val)) {
        if (!val.endsWith('?')) {
          const type = typeof obj[key]

          if (type === 'undefined') {
            return makeRes(key, 2)
          }
        }
      }
      else {
        return makeRes(key, 3, '', val)
      }
    }
    else if (typeof val === 'object') {
      const type = typeof obj[key]

      if (type === 'undefined') {
        return makeRes(key, 2)
      }
      else if (type !== 'object') {
        return makeRes(key, 1, 'object', type)
      }

      if (!Array.isArray(val)) {
        const newPath = path ? `${path} > ${key}` : key
        const res = CompareObjs(obj[key], model[key], newPath)

        if (res.status !== 0) {
          return res
        }
      }
    }
    else {
      return makeRes(key, 3, '', typeof val)
    }
  }

  return makeRes('', 0)
}

/*
  The model object must have as keys value a string,
  that must contains the type of the expected value,
  the accepted types are:
  number, string, boolean, any, [] and { ... }.
  And if the key is optional you can pass '?' after the type.
  Examples:
*/

export default CompareObjs
