const enumAlias = Symbol('alias');
export function setAlias(obj: Object, mappers: { value: any, alias: string }[]) {
    Reflect.defineMetadata(enumAlias, mappers, obj)
}
export function getAlias(obj: Object): { value: string, alias: any }[] {
    return Reflect.getMetadata(enumAlias, obj) ? Reflect.getMetadata(enumAlias, obj) : []
}
