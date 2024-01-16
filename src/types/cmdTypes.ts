
// @ts-ignore
import fetch from "sync-fetch";  // Our fetch module doesn't like typescript and doesn't declare it unfortunately...
import { ICommand  } from "../";

// Fetch our list
let resp = fetch("https://ts.azury.cc/api/v1/list") 

const data = resp.json();
// Since Typescript doesn't like it when we use our array without defining it properly we just put it as what it wants.
let CmdTypes = data.data as Array<ICommand>

export default CmdTypes;