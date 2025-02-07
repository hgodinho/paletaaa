import { AppType } from "@/context";
import { createContext, useContext } from "react";

export type MenuContextType = {
    items: AppType["graph"]["nodes"];
    setExpanded: (id: string) => void;
    removeItem: AppType["removeVertex"];
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
