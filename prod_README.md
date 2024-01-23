# Azury API 4 Node.JS
## Azury's Official way of using it's API!

Install here

```js
let { Client } = require("azuryapi");
```

```ts
import { Client } from "azuryapi";
```

```sh
npm i azuryapi@latest
```

Simple to use and easy to get started! 

Just look!

Using Node.JS
```js

let { Client } = require("azuryapi");
let azuryClient = new Client("YourToken") // To get one, join our server discord.gg/azury !!!

azuryClient.use("commandName", (result) => { // View endpoints here! https://api.azury.cc/endpoints
    console.log(result) 
}) // It's as simple as that!
```

Using TypeScript
```js

import { Client } from "azuryapi";
let azuryClient = new Client("YourToken") // To get one, join our server discord.gg/azury !!!

azuryClient.use("commandName", (result) => { // View endpoints here! https://api.azury.cc/endpoints
    console.log(result) 
}) // It's as simple as that!
```

See that? You can just get started easily!


Heres more advanced stuff

### Client settings
You can add some features to the client for more debugging or testing purposes! Check!

* logToConsole - Boolean
Log extra details to console!
```js


let { Client } = require("azuryapi");
let azuryClient = new AzuryAPI("YourToken", {
    logToConsole: true
});

// Get extra details for debugging purposes!
```

* detailedFetchLogs - Boolean
Get Fetch logs from fetches while using fetch related commmands
```js


let { Client } = require("azuryapi");
let azuryClient = new AzuryAPI("YourToken", {
    detailedFetchLogs: true
});

// Get extra details for debugging purposes!
```