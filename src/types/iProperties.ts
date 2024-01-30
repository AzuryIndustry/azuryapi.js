export interface Properties {
    content?: string;
    query?: string;
    // VERY IMPORTANT
    // We need this for custom queries! DO NOT REMOVE!
    [otherOptions: string | symbol | number]: unknown;
}