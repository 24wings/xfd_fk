export interface IGetAlias {
    options: { alias: string, value: any }[];
    getAlias(val: any): string
}