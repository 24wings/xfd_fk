export const ignoreKey = Symbol("ignoreKey");
export function Ignore(ignore: boolean = true) {
    return (target: any, propKey: string) => {
        let keys: string[] = Reflect.getMetadata(ignoreKey, target);
        if (!keys) keys = [];
        keys.push(propKey);
        Reflect.defineMetadata(ignoreKey, keys, target);
    }
}