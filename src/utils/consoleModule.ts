import process from 'process';

export function critError(errMsg: string, type?: number){
  if(type == null) return 0;
  if(type === 0){
  console.log("\x1b[31m [❌ - Error] | A critical error occured: "+errMsg);
  process.exit(0)
 } else if(type == 1){
    console.log("\x1b[31m [❌ - Error] | You are missing a requiredment: "+errMsg);
    process.exit(0)
 } else if(type == 2){
  console.log("\x1b[31m [❌ - Critical Web Service Error] | This is NOT Your FAULT! A critical error related to connecting with Azury API services has occured \n More info: "+errMsg+"\n Try again later or check the discord or report the bug! ");
  process.exit(0)
}
}

export function casualLog(msg: string, color?: string){
  console.log(`${color || ""} ${msg}`);
}