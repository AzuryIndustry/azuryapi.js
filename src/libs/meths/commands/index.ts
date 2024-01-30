import { critError } from "../../../utils/consoleModule"
import CmdTypes from "../../../types/cmdTypes"
import { executeRequest } from "../../../utils/contactModule"
import { iProperties } from "../../../"

/**
 * The main way of using endpoints.
 * @function
 * @param {string} cmdType - The command types aka endpoint names, check it via https://api.azury.cc/endpoints
 * @param {iProperties} Properties - Custom properties for the endpoint
 * @param {Function} execute - A function to execute once you get your data
 */
export function use(cmdType: string, properties: iProperties, execute?: Function){

  if(typeof CmdTypes == null || typeof CmdTypes == "undefined"){
    return critError("Unable to contact Azury API servers, please try again later...", 0);
  };

  if(CmdTypes?.find(e => e.name == cmdType) === undefined) return critError("Invalid command type", 1);
  
// All of our commands are using GET Methods but we can a cmdTypes.method to determine what method to use.
  let cmdTypeD = CmdTypes.find(e => e.name == cmdType);

 

  // @ts-ignore
  if(global?.options?.logToConsole == true) console.log("Command "+cmdType+" is now being executed!")

  if(properties?.content == null && cmdTypeD?.optionalQuery == true) return critError("Missing content! Please check the endpoints via here https://api.azury.cc/endpoints", 1);
   let result = executeRequest(cmdType, {
     versionNumber: "v1",
     useThirdParty: false,
     method: "GET",
     query: cmdTypeD?.optionalQuery == false && properties?.query !== null ? properties?.query : cmdTypeD?.optionalQuery == true && properties?.query !== null ? properties?.query : null,
     content: cmdTypeD?.optionalQuery == true ? properties?.content : null,
     // add custom different queries for commands that require sophisticated or more queries 
     // This gets the entries of the properties, filters the pre defined queries and maps it out as a object making it good.
     customQuery: Object.entries(properties).filter(([key]) => key !== "query" && key !== "content").map(([key, value]) => { return {name: key, value: value};}),
     // @ts-ignore
     token: global.token || null,
     optQuery: cmdTypeD?.optionalQuery,
     optQueryData: cmdTypeD?.optionalQuery == true ? properties?.query : null,
   });

   if(typeof execute !== null && typeof execute !== "undefined"){
    if(typeof execute === "function"){
      execute(result);
    } else {
      return critError("The third argument must be a function! Example: \n (result) => {console.log(result)}", 0)
    }
   } else {
    return result;
   }

  
    // @ts-ignore
    if(global?.options?.logToConsole == true) console.log("Command "+cmdType+" is done!")
  
  
}
