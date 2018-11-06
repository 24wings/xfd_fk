import { NzTreeNode } from "ng-zorro-antd";
import { AbstractTree } from "./AbstractTree";

export function listToTree<T>(list: AbstractTree<T>[]): AbstractTree<T>[] {
    let treeMenus: AbstractTree<T>[] = [];
    function getChildren<T>(topItem: AbstractTree<T>, options: AbstractTree<T>[]): AbstractTree<T>[] {
        let children = options.filter(menu => menu.getParentId() == topItem.getId());
        for (let submenu of children) {
            submenu.children = getChildren<T>(submenu, options);
        }
        return children;
    }
    /** 扫出顶级菜单,若存在下级菜单递归扫下级菜单 */
    if (list.some(menu => menu.getParentId() == 0 || !menu.getParentId())) {
        treeMenus = list.filter(menu => menu.getParentId() == 0 || !menu.getParentId());
        for (let menu of treeMenus) {
            menu.children = getChildren<T>(menu, list);
        }
    }
    return treeMenus;
}

export function listToNzTreeNode<T>(list: AbstractTree<T>[]): NzTreeNode[] {
    let trees = listToTree(list);
    function optionToNode(children: AbstractTree<T>[]) {
        for (let tree of children) {
            if (tree.children) {
                if (tree.children.length > 0) {
                    tree.children = optionToNode(tree.children);
                } else {
                }
            }
        }
        return children.map(child => {
            return {
                key: child.getId() + '',
                title: child.getText(),
                origin: child,
                children: child.children as any,
                checked: !!child.checked,
                isLeaf: child.children.length < 1,
                disabled: !!child['disabled'],
                disableCheckbox: !!child['disabled'],
                isSelected: !!child.selected,
            }
        }) as any;
    }
    return trees.map(tree => {
        if (tree.children.length > 0) {
            tree.children = optionToNode(tree.children) as any;
            console.log(tree)
        }
        return new NzTreeNode({
            title: tree.getText(),
            key: tree.getId() + '',
            children: tree.children as any,
            origin: tree,
            checked: !!tree.checked,
            isSelected: !!tree.selected,
            isMatched: !!tree.selected,
            disableCheckbox: !!tree['disabled'],
            disabled: !!tree['disabled']
        })

    })
}