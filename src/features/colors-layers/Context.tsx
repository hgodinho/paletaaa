import { createContext, useContext } from "react";
import { ColorsLayersContextType } from "./types";

export const colorsLayersContextDefault: ColorsLayersContextType = {
    setExpanded: () => {},
    removeItem: () => {},
    isExpanded: () => false,
};

export const ColorsLayersContext = createContext(colorsLayersContextDefault);

export function useColorsLayersContext() {
    return useContext(ColorsLayersContext);
}
