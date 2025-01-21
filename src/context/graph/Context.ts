import { createContext, useContext } from "react";
import { useGraph } from "@/lib";
import { Link, Node } from "./types";

export type GraphType = ReturnType<typeof useGraph<Node, Link>>;

export const GraphDefaults: GraphType = {
    graph: {
        vertices: 0,
        nodes: new Map(),
        adjList: new Map(),
    },
    getNodes: () => [],
    getLinks: () => [],
    getNode: () => undefined,
    addVertex: () => {},
    bfsAll: () => [],
    updateVertex: () => {},
    removeVertex: () => {},
    addDirEdge: () => {},
    removeDirEdge: () => {},
    addEdge: () => {},
    getNodeEdges: () => [],
    removeEdge: () => {},
    haveEdges: () => false,
    isDirEdge: () => false,
};

export const GraphContext = createContext<GraphType>(GraphDefaults);

export function useGraphContext() {
    return useContext(GraphContext);
}
