import { createContext, useContext } from "react";
import { ZoomContextType } from "./types";

export const ZoomContextDefault: ZoomContextType = {
    min: 0,
    max: 0,
    zoomToFit: () => {},
    zoom: () => {},
    zoomPlus: () => {},
    zoomMinus: () => {},
    contrast: "black",
};

export const ZoomContext = createContext<ZoomContextType>(ZoomContextDefault);

export function useZoomContext() {
    return useContext(ZoomContext);
}
