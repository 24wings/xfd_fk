export type ICustomAction = {
    label: string, multi: boolean, checkPower?: number;
    eventName?: string, url?: string;
    alawysDisplay?: boolean;
};
export type IToolbar = ICustomAction[];