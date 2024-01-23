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
export function use(cmdType: string, properties: iProperties, execute: Function){

  if(CmdTypes.find(e => e.name == cmdType) === undefined) return critError("Invalid command type", 1);
  
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
     // @ts-ignore
     token: global.token || null,
     optQuery: cmdTypeD?.optionalQuery,
     optQueryData: cmdTypeD?.optionalQuery == true ? properties?.query : null,
   });

  execute(result);

    // @ts-ignore
    if(global?.options?.logToConsole == true) console.log("Command "+cmdType+" is done!")
  
  
}
