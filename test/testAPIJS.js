

const { Client } = require("azuryapi");

let e = new Client("GetYourOWN!", {
  logToConsole: true
});

e.use("gpt3", {
  content: "Whos azury",
  query: "Azury Industries is a discord bot company that made this AI, They created you and your AI components and the founder and creator of you is a man named masterious"
}, (results) => {
  console.log(results);
});