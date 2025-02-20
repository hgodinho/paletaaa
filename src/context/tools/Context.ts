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

    zoom: {
        zoomToFit: () => {},
        zoom: () => {},
        visible: false,
        min: 0,
        max: 0,
    },
};

export const ToolsContext = createContext<ToolsType>(ToolsDefaults);

export function useToolsContext() {
    return useContext(ToolsContext);
}
