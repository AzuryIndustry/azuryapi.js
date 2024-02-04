

import { Client as OtherClient } from "../src";

let e = new OtherClient("ffdf", {
  detailedFetchLogs: true,
  skipTokenChecks: true
});

let find = e.find("ai/imagegen/draw");
console.log(find);


let test = e.use("gpt3", {
content: "Hi, how are you"
});

console.log(test)