
export type Table<T> = {
    [P in keyof T]?: T[P];
}





