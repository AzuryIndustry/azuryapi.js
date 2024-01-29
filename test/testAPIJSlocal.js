

const { Client } = require("../src");

let e = new Client("dffdf");

e.use("antinsfw", {
  query: "https://gypsyshutterbug.files.wordpress.com/2013/08/laffinghorse.jpg"
}, (results) => {
  console.log(results);
});