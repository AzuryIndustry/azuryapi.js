export interface Request {
    content: string;
    query: string;
    method: string;
    versionNumber: string;
    token: string;
    customQuery: Array<any>;
    body?: any;
    useThirdParty: boolean;
    optQuery: boolean;
    optQueryData: string;
}