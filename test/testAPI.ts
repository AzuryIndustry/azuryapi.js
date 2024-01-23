

import { Client } from "azuryapi";

let e = new Client("", {
  detailedFetchLogs: true
});

e.use("antinsfw", {
  query: "https://gypsyshutterbug.files.wordpress.com/2013/08/laffinghorse.jpg",
}, (results: any) => {
  console.log(results);
});