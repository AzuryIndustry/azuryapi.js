

import { Client as OtherClient } from "../dist/src";


let e = new OtherClient("ejijrf", {
    detailedFetchLogs: true,
    skipTokenChecks: true
  });
  
  let find = e.find("ai/imagegen/draw");
  console.log(find);
  
  
  let test = e.use("gpt3", {
  content: "Hi, how are you"
  });
  
  console.log(test)