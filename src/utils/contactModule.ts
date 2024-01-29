// @ts-ignore
//import fetch from "sync-fetch";
import { IRequest } from "../";
import { fetch } from "../externals/contactFetchModule"
import { critError } from "./consoleModule";


export function verifyToken(token: string): boolean {

 // Do a command if it returns a token error! return false otherwise return true
// I will add a command manually that checks tokens manuaully
  // This is very slow as it checks for 

let resp = fetch("https://ts.azury.cc/api/v1/checktoken?apiKey="+token) 

if(typeof resp == null || typeof resp == "undefined") critError("Unable to contact Azury API services", 0);

const data = resp.json();

if(data.success == false) return false; 
 else return true; 
  
}

// This is very messy but it works i guess...
export function executeRequest(url: string, reqProperties: IRequest){

if(reqProperties?.useThirdParty){
  let resp = fetch(url, {
    method: reqProperties?.method || "GET",
    body: reqProperties?.body || null,
  })


if(typeof resp == null || typeof resp == "undefined") critError("Unable to contact Azury API services", 0);

return resp.json()
  
} else {
  
let resp = fetch("https://ts.azury.cc/api/"+`${reqProperties?.versionNumber !== null ? reqProperties?.versionNumber : "v1"}`+"/"+url+`${reqProperties?.method == "GET" ? `?apiKey=${reqProperties?.token}` : ""}${reqProperties?.query !== null ? `&query=${reqProperties?.query}` : ""}${reqProperties?.content !== null ? `&content=${reqProperties?.query}` : ""}`, {
      method: reqProperties?.method || "GET",
      body: reqProperties?.body || null,
    })

if(typeof resp == null || typeof resp == "undefined") critError("Unable to contact Azury API services", 0);
  
  return resp.json();
}
 
}