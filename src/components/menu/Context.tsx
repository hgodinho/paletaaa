import { createContext, useContext } from "react";

export type MenuContextType = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export const menuContextDefault: MenuContextType = {
    open: false,
    setOpen: () => {},
};

export const MenuContext = createContext(menuContextDefault);

export function useMenuContext() {
    return useContext(MenuContext);
}
