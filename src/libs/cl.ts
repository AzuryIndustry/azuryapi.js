import { EventEmitter } from "events";
import {critError, casualLog} from "../utils/consoleModule";
import {verifyToken} from "../utils/contactModule";
import { IOptions } from "../"
import { use } from "./meths/commands/index";
import find from "./meths/commands/help";


export class azuryAPIClient extends EventEmitter  {
  options: {
    token: string;
}


/**
 * The client initalizor 
 * @constructor
 * @param {string} token - A token you must have to use Azury API - Applications are CLOSED!
 * @param {IOptions} options - Optional but just there if you want
 */

constructor(token: string, options?: IOptions){
  if (!token) critError("No token provided!", 1);
  super();
  if(typeof options !== null && typeof options !== undefined){
   if(options?.logToConsole === true){
     casualLog("Log to console is enabled & client has started", "\x1b[32m");
   } 
  }
  
  if(!options.skipTokenChecks){
  let tV = verifyToken(token)
  if(tV == false) critError("Token is not valid!", 1);
  }
  // @ts-ignore
  global.token = token;
  // @ts-ignore
  global.options = options;
  if(options?.logToConsole == true && !options?.skipTokenChecks) console.log("Token is valid!");
  
}

/* Commands! */
  use = use
  find = find;

}