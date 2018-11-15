
export abstract class AbstractTable<T>  {
    abstract getId(): number;
    abstract getText(): string;
    checked?: boolean;
}


