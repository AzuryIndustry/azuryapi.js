

const { Client } = require("azuryapi");

let e = new Client("fgfgfg");

e.use("antinsfw", {
  query: "https://gypsyshutterbug.files.wordpress.com/2013/08/laffinghorse.jpg"
}, (results) => {
  console.log(results);
});