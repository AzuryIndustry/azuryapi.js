

const { Client: otherClient } = require("../dist/src");  // This is for te

let e = new otherClient("dffdf");

e.use("antinsfw", {
  query: "https://gypsyshutterbug.files.wordpress.com/2013/08/laffinghorse.jpg"
}, (results) => {
  console.log(results);
});