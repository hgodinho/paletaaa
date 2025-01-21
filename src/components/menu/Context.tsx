import { GraphType } from "@/context";
import { createContext, useContext } from "react";

export type MenuContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;

    items: GraphType["graph"]["nodes"];
    setExpanded: (id: string) => void;
    bfsAll: GraphType["bfsAll"];
    removeItem: GraphType["removeVertex"];
};

export const menuContextDefault: MenuContextType = {
    open: false,
    setOpen: () => { },

    items: new Map(),
    setExpanded: () => { },
    bfsAll: () => [],
    removeItem: () => { },
};

export const MenuContext = createContext(menuContextDefault);

export function useMenuContext() {
    return useContext(MenuContext);
}
