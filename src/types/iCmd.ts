export interface Command {
    name: string;
    description: string;
    isFree: boolean;
    type: string;
    optionalQuery: boolean;
    category: string;
}