# Azury API 4 Node.JS
## Azury's Official way of using it's API!


Welcome to Azury's official NPM package for using our Web API package!
Everything is operated on the api servers, this NPM package serves as a middleman for giving your data to the servers and getting data back from the servers.
It makes everything easier working on projects that you need this API package for!

This NPM package requires no async(hronous) usage so no awaits or asyncs anywhere while using this package
This NPM package requires a stable connection and some form of technical competence

Got any problems, report them [here](discord.gg/azury)


Install here

```js
let { Client } = require("azuryapi");
```

```ts
import { Client } from "azuryapi";
```

or if we aren't as significant...

```js
let { Client: azuryClient } = require("azuryapi");

```

```ts
import { Client as azuryClient } from "azuryapi";
```

```sh
npm i azuryapi@latest
```

Simple to use and easy to get started! 

Just look!

Using Node.JS without using variables
```js

let { Client } = require("azuryapi");
let azuryClient = new Client("YourToken") // To get one, join our server discord.gg/azury !!!

azuryClient.use("commandName", {
    propertyName: propertyValue // You will need properties to configurate different endpoints depending on how the command is structured.
} ,(result) => { // Learn more about endpoints here! https://api.azury.cc/endpoints
    console.log(result) 
}) // It's as simple as that!
```

Using TypeScript without using variables
```ts

import { Client } from "azuryapi";
let azuryClient = new Client("YourToken") // To get one, join our server discord.gg/azury !!!

azuryClient.use("commandName", {
    propertyName: propertyValue // You will need properties to configurate different endpoints depending on how the command is structured.
}, (result) => { // View endpoints here! https://api.azury.cc/endpoints
    console.log(result) 
}) // It's as simple as that!
```

Or you don't want to use functions inside the function? Just define it as a variable
Using Node.JS!
```js

let { Client } = require("azuryapi");
let azuryClient = new Client("YourToken") // To get one, join our server discord.gg/azury !!!

let command = azuryClient.use("commandName", {
    propertyName: propertyValue // You will need properties to configurate different endpoints depending on how the command is structured.
}); // It's as simple as that!

console.log(command);
```

Using TypeScript
```ts

import { Client } from "azuryapi";
let azuryClient = new Client("YourToken") // To get one, join our server discord.gg/azury !!!

let command = azuryClient.use("commandName", {
    propertyName: propertyValue // You will need properties to configurate different endpoints depending on how the command is structured.
}); // It's as simple as that!

console.log(command);

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

## Extra commands
### Find!
Find details about a command!

Node.JS
```js

let { Client } = require("azuryapi");
let azuryClient = new Client("YourToken") // To get one, join our server discord.gg/azury !!!

let findData = azuryClient.find("gpt3");

console.log(findData)
```
TypeScript
```ts

import { Client } from "azuryapi";
let azuryClient = new Client("YourToken") // To get one, join our server discord.gg/azury !!!

let findData = azuryClient.find("gpt3");

console.log(findData)
```

## Changelogs

### 1.0.4
- Added a find command (Search details of a command).
- Bug Fixes
- Code has been minified for better performance and size for those who aren't so fortunate with space or memory.
### 1.0.3
- Custom Query support
- Allow support of not adding function to the use function.
- Bug Fixes
### 1.0.2
- Error handing to web services added and additional error handling..