import { createContext, useContext } from "react";
import {} from "@/lib";
import { AppType } from "./types";

export const AppDefaults: AppType = {
    graph: {
        vertices: 0,
        nodes: new Map(),
        edges: new Map(),
    },

    getVertices: () => [],
    getEdges: () => [],
    getVertex: () => undefined,
    addVertex: () => {},
    bfsAll: () => [],
    updateVertex: () => {},
    updateVertices: () => {},
    removeVertex: () => {},
    addDirEdge: () => {},
    removeDirEdge: () => {},
    addEdge: () => {},
    getNodeEdges: () => [],
    removeEdge: () => {},
    haveEdges: () => false,
    isDirEdge: () => false,
    fromJSON: () => {},
    toJSON: () => ({
        vertices: 0,
        nodes: [],
        edges: [],
    }),
    updateStorage: () => {},
    hasVertex: () => false,
    addVertices: () => {},
    removeVertices: () => {},
    addEdges: () => {},
    addDirEdges: () => {},

    sidebar: false,

    setSidebar: () => false,
    viewport: {
        width: 480,
        height: 800,
        isMobile: true,
        isTablet: false,
        isDesktop: false,
    },
};

export const AppContext = createContext<AppType>(AppDefaults);

export function useAppContext() {
    return useContext(AppContext);
}
