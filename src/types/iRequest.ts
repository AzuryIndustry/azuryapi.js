export interface Request {
    method: string;
    versionNumber: string;
    token: string;
    customQuery: Array<any>;
    body?: any;
    useThirdParty: boolean;
}