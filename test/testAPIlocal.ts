

import { Client } from "../src";

let e = new Client("rfdfd", {
  detailedFetchLogs: true
});

e.use("antinsfw", {
  query: "https://gypsyshutterbug.files.wordpress.com/2013/08/laffinghorse.jpg",
}, (results: any) => {
  console.log(results);
});