const { default: jwtDecode } = require("jwt-decode")
const { DateTime } = require("luxon")
const URL = require('url-parse')
const JSON5 = require('json5').default // https://github.com/json5/json5/issues/240

const parse = async (str) => {
  if (!str || !str.trim()) {
    return { error: 'Empty string' }
  }

  const trimmedStr = str.trim()

  /* 
   * Try JWT parse if it starts with 'eyJ'
   */
  if (trimmedStr.startsWith('eyJ')) {
    try {
      // Remove newlines, as some HAR parsers split the params to lines
      const res = parseJWT(trimmedStr.replace(/\n/g, ''))
      return res
    } catch(e) {}
  }

  /*
   * Try URL parse if string includes '://'
   */
  if (trimmedStr.includes('://')) {
    try {
      const res = parseURL(trimmedStr)
      return res
    } catch(e) {}
  }

  /*
   * Try URL parse if it starts with '/'
   * This is useful when pasting paths from Kibana, etc
   */
  if (trimmedStr.startsWith('/')) {
    try {
      const res = parseURL(`https://example.com${trimmedStr}`, true)
      return res
    } catch(e) {}
  }
  
  /*
   * Try JSON parse
   */
  if (trimmedStr.startsWith('{') || trimmedStr.startsWith('[')) {
    try {
      const res = parseJSON(trimmedStr)
      return res
    } catch (e) {}
  }

  return { error: 'Unknown format' }
}

/*
 * Parse JWT
 */
const parseJWT = (str) => {
  const header = jwtDecode(str, { header: true })
  const payload = jwtDecode(str)
  const fieldArray = []

  const addItem = kvpair => {
    const key = kvpair[0]
    const val = typeof kvpair[1] === 'object' ? JSON.stringify(kvpair[1]) : kvpair[1]
    // Create human-readable tooltips for unix timestamps
    const obj = { name: key, val: val }
    if (['iat', 'exp', 'nbf', 'auth_time'].includes(key)) {
      obj.tooltip = DateTime.fromSeconds(val).toISO()
    }
    fieldArray.push(obj)
  }

  fieldArray.push({ heading: 'Header' })
  Object.entries(header).forEach(addItem)

  fieldArray.push({ heading: 'Payload' })
  Object.entries(payload).forEach(addItem)

  return { type: 'jwt', value: fieldArray }
}

/*
 * Parse URL
 */
const parseURL = (str, isPartialURL = false) => {
  const parsed = new URL(str)
  if (!parsed || !parsed.hostname) {
    throw new Error('Invalid URL')
  }

  const res = []

  if (isPartialURL) {
    // In case of partial URL, we don't add the part before the path to result
    res.push({ heading: 'Partial URL' })
  } else {
    const prot = parsed.protocol
    res.push({ heading: 'URL' })
    res.push({ name: 'Protocol', val: prot.substr(0, prot.length-1) })
    res.push({ name: 'Hostname', val: parsed.hostname })
  }
  res.push({ name: 'Path', val: parsed.pathname })

  if (parsed.port) {
    res.push({ name: 'Port', val: parsed.port })
  }
  if (parsed.auth) {
    res.push({ name: 'Auth', val: parsed.auth })
  }

  const addItem = p => {
    const obj = { name: p[0], val: p[1] }
    if (p[0] === 'expires_in') {
      if (p[0] < 3600) {
        const mins = p[1]/60
        obj.tooltip = `${mins} minute${mins > 1 ? 's' : ''}`
      } else {
        const hrs = p[1]/3600
        obj.tooltip = `${hrs} hour${hrs > 1 ? 's' : ''}`
      }
    }
    res.push(obj)
  }

  if (parsed.query && parsed.query.length > 1) {
    res.push({ heading: 'Query params' })
    Object.entries(URL.qs.parse(parsed.query)).forEach(addItem)
  }

  if (parsed.hash && parsed.hash.length > 1) {
    res.push({ heading: 'Hash fragment' })
    Object.entries(URL.qs.parse(parsed.hash.substr(1))).forEach(addItem)
  }

  return { type: 'url', value: res }
}

/*
 * JSON parse
 */
const parseJSON = (str) => {
  const json = JSON5.parse(str)
  return { type: 'json', value: json }
}

module.exports = {
  parse
}