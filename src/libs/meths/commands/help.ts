import CmdTypes from "../../../types/cmdTypes"
import { critError } from "../../../utils/consoleModule"
import { executeRequest } from "../../../utils/contactModule"

export default function find(cmd: string) {

    if(typeof CmdTypes == null || typeof CmdTypes == "undefined"){
        return critError("Unable to contact Azury API servers, please try again later...", 0);
      };

      if(CmdTypes?.find(e => e.name == cmd) === undefined) return critError("Invalid command type", 1);
      let cmdTypeD = CmdTypes.find(e => e.name == cmd);

      return {
        name: cmdTypeD.name,
        description: cmdTypeD.description,
        type: cmdTypeD.type,
        isFree: cmdTypeD.isFree,
        requiredParams: cmdTypeD.requiredParams
      }



}