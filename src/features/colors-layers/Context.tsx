import { createContext, useContext } from "react";
import { ColorsLayersContextType } from "./types";

export const colorsLayersContextDefault: ColorsLayersContextType = {
    setExpanded: () => {},
    removeItem: () => {},
    isExpanded: () => false,
    duplicateItem: () => {},
};

export const ColorsLayersContext = createContext(colorsLayersContextDefault);

export function useColorsLayersContext() {
    return useContext(ColorsLayersContext);
}
