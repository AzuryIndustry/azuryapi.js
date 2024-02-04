/* 
--- Sync Fetch Source code ---
https://github.com/larsgw/sync-fetch/

Modified for AzuryAPI usage.
For the better of my sanity there are 4 files for different workers.
2 TypeScript
2 Node.JS

Makes my life easier you know!

Testing - 
GETs Work
Posts NOT TESTED
*/

import { critError } from "../utils/consoleModule"

const Stream = require('stream')

export function serializeHeaders (headers: any) {
  return headers.raw()
}

export function deserializeHeaders (fetch: any, old: any) {
  const headers = new fetch.Headers()
  for (const name in old) {
    for (const value of old[name]) {
      headers.append(name, value)
    }
  }
  return headers
}

export function serializeRequest (request: any) {
  return [
    request.url,
    {
      method: request.method,
      headers: request.headers,
      body: request.body,
      mode: request.mode,
      credentials: request.credentials,
      cache: request.cache,
      redirect: request.redirect,
      referrer: request.referrer,
      referrerPolicy: request.referrerPolicy,
      integrity: request.integrity,
      keepalive: request.keepalive,
      // signal: request.signal,

      // node-fetch props
      follow: request.follow,
      timeout: request.timeout,
      compress: request.compress,
      size: request.size
      // agent: request.agent
    }
  ]
}

export function deserializeRequest (fetch: any, resource?: any, init?: any) {
  return new fetch.Request(resource, {
    ...init,
    body: init.body ? Buffer.from(init.body, 'base64') : undefined,
    headers: deserializeHeaders(fetch, init.headers)
  })
}

export function serializeResponse (response: any) {
  return {
    url: response.url,
    headers: response.headers.raw(),
    status: response.status,
    statusText: response.statusText,
    counter: response.redirected ? 1 : 0 // could be more than one, but no way of telling
  }
}

export function deserializeResponse (fetch: any, body?: any, init?: any, bodyError?: any) {
  const buffer = Buffer.from(body, 'base64')

  return new fetch.Response(
    body ? createStream(buffer) : createStream(null),
    {
      ...init,
      headers: deserializeHeaders(fetch, init.headers)
    },
    {
      buffer,
      bodyError
    }
  )
}

const errors = {
  TypeError
}

export function serializeError ( constructor: any, message?: any, type?: any, code?: any ) {
  return [
    constructor.name,
    [message, type, { code }]
  ]
}

export function deserializeError (fetch: any, name?: any, init?: any) {
  if (name in errors) {
      // @ts-ignore
    return new errors[name](...init)
  } else {
    return critError(init, 2)
  }
}

export function parseBodyType (body: any) {
  if (body == null) {
    return 'Null'
  } else if (body.constructor.name === 'URLSearchParams') {
    return 'URLSearchParams'
  } else if (Buffer.isBuffer(body)) {
    return 'Buffer'
  } else if (Object.prototype.toString.call(body) === '[object ArrayBuffer]') {
    return 'ArrayBuffer'
  } else if (ArrayBuffer.isView(body)) {
    return 'ArrayBufferView'
  } else if (body instanceof Stream) {
    return 'Stream'
  } else {
    return 'String'
  }
}

export function parseBody (body: any, type = parseBodyType(body)) {
  switch (type) {
    case 'Null': return null
    case 'URLSearchParams': return Buffer.from(body.toString())
    case 'Buffer': return body
    case 'ArrayBuffer': return Buffer.from(body)
    case 'ArrayBufferView': return Buffer.from(body.buffer, body.byteOffset, body.byteLength)
    case 'String': return Buffer.from(String(body))
    default: throw new TypeError(`sync-fetch does not support bodies of type: ${type}`)
  }
}

export function createStream (buffer: any) {
  return new Stream.Transform({
    read () {
      this.push(buffer)
      this.push(null)
    }
  })
}

