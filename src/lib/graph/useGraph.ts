import { useReducer } from "react";

import { BaseVertex, BaseEdge, BFSVertexCallback } from "./types";
import { parseColor } from "react-aria-components";
import { reducer } from "./reducer";

export type GraphState<V extends BaseVertex> = {
    vertices: number;
    nodes: Map<string, V>;
    adjList: Map<string, Set<string>>;
};

const initialState: GraphState<BaseVertex> = {
    vertices: 0,
    nodes: new Map([
        [
            "background",
            {
                id: "background",
                expanded: true,
                color: {
                    data: parseColor(
                        `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${
                            Math.random() * 100
                        }%)`
                    ),
                    title: "background",
                    nodeVal: 20,
                },
            },
        ],
    ]),
    adjList: new Map([["background", new Set<string>()]] as [
        string,
        Set<string>
    ][]),
};

export function useGraph<V extends BaseVertex, E extends BaseEdge<V>>() {
    const [graph, dispatch] = useReducer(
        reducer<V, E>,
        initialState as GraphState<V>
    );

    const getNodes = () => {
        return Array.from(graph.nodes.values());
    };

    const getLinks = () => {
        const links: E[] = [];

        graph.adjList.forEach((targets, source) => {
            targets.forEach((target) => {
                links.push({ source, target } as E);
            });
        });

        return links;
    };

    const getNodeEdges = (id: V["id"]) => {
        // return graph.adjList.get(id)
        const edges: E[] = [];
        const targets = graph.adjList.get(id);
        if (targets) {
            targets.forEach((target) => {
                edges.push({ source: id, target } as E);
            });
        }
        return edges;
    };

    const getNode = (id: V["id"]) => {
        return graph.nodes.get(id);
    };

    const addVertex = (vertex: V) => {
        dispatch({ type: "ADD_VERTEX", payload: vertex });
    };

    const removeVertex = (id: V["id"]) => {
        dispatch({ type: "REMOVE_VERTEX", payload: id });
    };

    const updateVertex = (node: V) => {
        dispatch({ type: "UPDATE_VERTEX", payload: node });
    };

    const hasVertex = (id: V["id"]) => {
        return graph.nodes.has(id);
    };

    const addEdge = (edge: E) => {
        if (hasVertex(edge.source) && hasVertex(edge.target))
            dispatch({ type: "ADD_EDGE", payload: edge });
    };

    const addDirEdge = (edge: E) => {
        if (hasVertex(edge.source) && hasVertex(edge.target))
            dispatch({ type: "ADD_DIR_EDGE", payload: edge });
    };

    const isDirEdge = (source: V["id"], target: V["id"]) => {
        return (
            graph.adjList.get(source)?.has(target) &&
            graph.adjList.get(target)?.has(source)
        );
    };

    const removeDirEdge = (edge: E) => {
        dispatch({ type: "REMOVE_DIR_EDGE", payload: edge });
    };

    const removeEdge = (edge: E) => {
        dispatch({ type: "REMOVE_EDGE", payload: edge });
    };

    const haveEdges = () => {
        return graph.adjList.size > 0;
    };

    /**
     * Perform BFS traversal on the entire graph, including disconnected components.
     * @param callback | BFSVertexCallback - A function to execute on each traversed vertex
     * @returns an array of visited vertices in BFS order
     */
    const bfsAll = <R = unknown>(callback?: BFSVertexCallback<V, R>) => {
        const visited = new Set<string>();
        const result: (V["id"] | R)[] = [];

        for (const start of graph.nodes.keys()) {
            if (!visited.has(start)) {
                const queue = [start];

                while (queue.length > 0) {
                    const current = queue.shift() as V["id"];

                    if (!visited.has(current)) {
                        visited.add(current);

                        if (callback && getNode(current)) {
                            const callbackResult = callback(
                                getNode(current) as V,
                                current
                            );
                            if (callbackResult) result.push(callbackResult);
                        } else {
                            result.push(current);
                        }

                        const neighbors = graph.adjList.get(current) || [];
                        for (const neighbor of neighbors) {
                            if (!visited.has(neighbor)) {
                                queue.push(neighbor);
                            }
                        }
                    }
                }
            }
        }

        return result;
    };

    return {
        graph,

        // helpers
        getNodes,
        getLinks,
        getNode,
        getNodeEdges,
        isDirEdge,
        haveEdges,

        // dispatchers
        addVertex,
        removeVertex,
        updateVertex,

        addEdge,
        addDirEdge,
        removeEdge,
        removeDirEdge,

        // traverse
        // bfs,
        bfsAll,
    };
}
