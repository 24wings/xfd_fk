
export abstract class AbstractTree<T>  {
    abstract getId(): number;
    abstract getParentId(): number;
    abstract getText(): string;
    children: AbstractTree<T>[];
    checked?: boolean;
    disabled?: boolean;
    selected?: boolean;
}
