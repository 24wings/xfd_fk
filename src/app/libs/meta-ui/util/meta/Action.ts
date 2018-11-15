
export type IAction = {
    label: string;
    power?: number;
    nzType?: 'primary' | 'default' | 'danger';
    to: number | any | Function;
    // eventName:string;
};