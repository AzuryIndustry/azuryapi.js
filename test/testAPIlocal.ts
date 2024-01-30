

import { Client as OtherClient } from "../src";

let e = new OtherClient("e", {
  detailedFetchLogs: true
});

let test = e.use("antinsfw", {
  query: "https://gypsyshutterbug.files.wordpress.com/2013/08/laffinghorse.jpg",
  memes: "test"
});

console.log(test)