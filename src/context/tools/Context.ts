import { createContext, useContext } from "react";
import { ToolsType } from "./types";

export const ToolsDefaults: ToolsType = {
    visible: false,
    setVisible: () => {},
    state: {
        labels: { active: false },
        magnet: { active: false },
        background: { active: false },
    },
    toggleLabels: () => {},
    toggleMagnet: () => {},
    toggleBackground: () => {},
};

export const ToolsContext = createContext<ToolsType>(ToolsDefaults);

export function useToolsContext() {
    return useContext(ToolsContext);
}
