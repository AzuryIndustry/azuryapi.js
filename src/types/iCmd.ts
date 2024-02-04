export interface Command {
    name: string;
    description: string;
    isFree: boolean;
    type: string;
    category: string;
    requiredParams: Array<string>;
}