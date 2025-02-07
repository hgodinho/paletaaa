import { createContext, useContext } from "react";
import { useGraph } from "@/lib";
import { Link, Node } from "./types";

export type AppType = ReturnType<typeof useGraph<Node, Link>> & {
    updateStorage: () => void;
}

export const AppDefaults: AppType = {
    graph: {
        vertices: 0,
        nodes: new Map(),
        edges: new Map(),
    },
    getNodes: () => [],
    getLinks: () => [],
    getNode: () => undefined,
    addVertex: () => { },
    bfsAll: () => [],
    updateVertex: () => { },
    updateVertices: () => { },
    removeVertex: () => { },
    addDirEdge: () => { },
    removeDirEdge: () => { },
    addEdge: () => { },
    getNodeEdges: () => [],
    removeEdge: () => { },
    haveEdges: () => false,
    isDirEdge: () => false,
    fromJSON: () => { },
    toJSON: () => ({
        vertices: 0,
        nodes: [],
        edges: [],
    }),
    updateStorage: () => { },
};

export const AppContext = createContext<AppType>(AppDefaults);

export function useAppContext() {
    return useContext(AppContext);
}
