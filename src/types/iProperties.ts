export interface Properties {
    /* 
    ---Deprecated---

    Manual object properties like content and query may cause additional problems and is unnecesscary!
    It can be collected as well with the index signature
    */
    // content?: string;
    // query?: string;

    
    [otherOptions: string | symbol | number]: unknown;
}