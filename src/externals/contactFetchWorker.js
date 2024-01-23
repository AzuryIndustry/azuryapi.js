#!/usr/bin/env node

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


const fetch = require('node-fetch')
const shared = require('./contactFetchShared2')
const chunks = []

process.stdin.resume()
process.stdin.setEncoding('utf8')

process.stdin.on('data', function (chunk) {
  chunks.push(chunk)
})

process.stdin.on('end', function () {
  const input = JSON.parse(chunks.join(''))
  const request = shared.deserializeRequest(fetch, ...input)

  fetch(request)
    .then(response => response.buffer()
      .then(buffer => respond([
        buffer.toString('base64'),
        shared.serializeResponse(response)
      ]))
      .catch(error => respond([
        '',
        shared.serializeResponse(response),
        shared.serializeError(error)
      ]))
    )
    .catch(error => respond(shared.serializeError(error)))
})

function respond (message) {
  process.stdout.write(JSON.stringify(message))
}