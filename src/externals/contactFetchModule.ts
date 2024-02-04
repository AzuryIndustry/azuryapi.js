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

const _fetch = require('node-fetch')
import {serializeHeaders, serializeRequest, parseBody, deserializeResponse, deserializeError, createStream, serializeResponse} from './contactFetchShared'
import {casualLog, critError} from "../utils/consoleModule";
import exec from 'child_process'
let exec2 = exec.execFileSync;
import path from "path";

function sendMessage (message: any) {
  return exec2(process.execPath, [path.join(__dirname, 'contactFetchWorker')], {
    windowsHide: true,
    maxBuffer: Infinity,
    input: JSON.stringify(message),
    shell: false
  }).toString()
}

export function fetch (resource: any, init?: any) { 
    // @ts-ignore
  if(global.options?.detailedFetchLogs) casualLog("Detailed Logs are enabled! Beware!!!");
  
  // 
  const request = []

  if (resource instanceof fetch.Request) {
    
    request.push(...serializeRequest(resource))
  } else if (resource instanceof URL) {
    request.push(resource.href, {})
  } else {
    request.push(resource, {})
  }

     // @ts-ignore
     if(global.options?.detailedFetchLogs) casualLog("Your fetch prequisites \n"+request);

  Object.assign(request[1], init)

  request[1].headers = new _fetch.Headers(request[1].headers)

  if (request[1].body) {
    const contentType = extractContentType(request)
    if (contentType && !request[1].headers.get('content-type')) { request[1].headers.append('content-type', contentType) }
    request[1].body = parseBody(init.body).toString('base64')
  }

  request[1].headers = serializeHeaders(request[1].headers)

  // TODO credentials
  // Not sure when thats happening

 
  
  const response = JSON.parse(sendMessage(request))
  if ('headers' in response[1]) {
      // @ts-ignore  
    if(global.options?.detailedFetchLogs) casualLog("Completed with no problems");
        // @ts-ignore
        if(global.options?.detailedFetchLogs) casualLog("Your fetch details \n"+sendMessage(request));

    return deserializeResponse(fetch, ...response)
  } else {
      // @ts-ignore
    if(global.options?.detailedFetchLogs) critError("Completed but there are problems...", 0);
    throw deserializeError(fetch, ...response)
  }
}

function extractContentType (input: any) {
  const request = new _fetch.Request(...input)
  return request.headers.get('content-type') || undefined
}

const _body = Symbol('bodyBuffer')
const _bodyError = Symbol('bodyError')

class SyncRequest extends _fetch.Request {
  constructor (resource: any, init: any) {
    const buffer = parseBody(init.body)

    super(resource, init)
    defineBuffer(this, buffer)
  }

  // clone () {
  //   checkBody(this)
  //   return new SyncRequest(...serializeRequest(this))
  // }
}

class SyncResponse extends _fetch.Response {
  constructor (body: any, init: any, options: any) {
    const {
      buffer = parseBody(body),
      bodyError
    } = options

    super(body, init)
    defineBuffer(this, buffer)
    if (bodyError) defineBodyError(this, bodyError)
  }

  // clone () {
  //   checkBody(this)
  //   const buffer = Buffer.from(this[_body])
  //   return new SyncResponse(
  //     createStream(buffer),
  //     serializeResponse(this),
  //     {
  //       buffer,
  //       bodyError: this[_bodyError]
  //     }
  //   )
  // }
}

class Body {
  static mixin (proto: any) {
    for (const name of Object.getOwnPropertyNames(Body.prototype)) {
      if (name === 'constructor') { continue }
      const desc = Object.getOwnPropertyDescriptor(Body.prototype, name)
      Object.defineProperty(proto, name, {
        ...desc,
        enumerable: true
      })
    }
  }

  arrayBuffer () {
    checkBody(this)
    const buf = consumeBody(this)
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  }

  text () {
    checkBody(this)
    return consumeBody(this).toString()
  }

  json () {
    checkBody(this)
    try {
      return JSON.parse(consumeBody(this).toString())
    } catch (err) {
      //throw new fetch.FetchError(`invalid json response body at ${this.url} reason: ${err.message}`, 'invalid-json')
    }
  }

  buffer () {
    checkBody(this)
    return Buffer.from(consumeBody(this))
  }

  textConverted () {
    throw new fetch.FetchError('textConverted not implemented')
  }
}

function _super (self: any, method: any) {
  return Object.getPrototypeOf(Object.getPrototypeOf(self))[method].bind(self)
}

function checkBody (body: any) {
  if (body[_bodyError]) {
    throw body[_bodyError]
  }
  if (body.bodyUsed) {
    throw new TypeError(`body used already for: ${body.url}`)
  }
}

function consumeBody (body: any) {
  _super(body, 'buffer')().catch((error: any) => console.error(error))
  return body[_body] || Buffer.alloc(0)
}

function defineBuffer (body: any, buffer: any) {
  Object.defineProperty(body, _body, {
    value: buffer,
    enumerable: false
  })
}

function defineBodyError (body: any, error: any) {
  Object.defineProperty(body, _bodyError, {
    value: deserializeError(fetch, ...error),
    enumerable: false
  })
}

Body.mixin(SyncRequest.prototype)
Body.mixin(SyncResponse.prototype)
Object.defineProperties(SyncRequest.prototype, { clone: { enumerable: true } })
Object.defineProperties(SyncResponse.prototype, { clone: { enumerable: true } })

fetch.Headers = _fetch.Headers
fetch.FetchError = _fetch.FetchError
fetch.Request = SyncRequest
fetch.Response = SyncResponse