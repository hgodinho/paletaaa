import { createContext, useContext } from "react";
import {} from "@/lib";
import { AppType } from "./types";

export const AppDefaults: AppType = {
    graph: {
        vertices: 0,
        nodes: new Map(),
        edges: new Map(),
    },
    graphInstance: null,
    setGraphInstance: () => {},

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
    scale: 1,
    setScale: () => 1,

    viewport: {
        width: 480,
        height: 800,
        isMobile: true,
        isTablet: false,
        isDesktop: false,
    },

    options: {
        width: 480,
        height: 800,
        graphData: {
            nodes: [],
            links: [],
        },
        minZoom: 0.5,
        maxZoom: 10,
        linkDirectionalArrowLength: 4,
        linkDirectionalArrowRelPos: 0.3,
        nodeRelSize: 16,
    },
};

export const AppContext = createContext<AppType>(AppDefaults);

export function useAppContext() {
    return useContext(AppContext);
}
