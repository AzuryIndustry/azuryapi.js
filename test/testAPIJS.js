

const { Client } = require("azuryapi");

let e = new Client("");

e.use("antinsfw", {
  query: "https://gypsyshutterbug.files.wordpress.com/2013/08/laffinghorse.jpg"
}, (results) => {
  console.log(results);
});