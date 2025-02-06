import { GraphType } from "@/context";
import { createContext, useContext } from "react";

export type MenuContextType = {
    items: GraphType["graph"]["nodes"];
    setExpanded: (id: string) => void;
    removeItem: GraphType["removeVertex"];
};

export const menuContextDefault: MenuContextType = {
    items: new Map(),
    setExpanded: () => {},
    removeItem: () => {},
};

export const MenuContext = createContext(menuContextDefault);

export function useMenuContext() {
    return useContext(MenuContext);
}
