import { useReducer } from "react";

import { BaseVertex, BaseEdge, BFSVertexCallback, GraphJSON } from "./types";

import { reducer } from "./reducer";

const initialState: GraphJSON<BaseVertex> = {
    vertices: 0,
    nodes: [],
    edges: [],
};

function parseJSON<V extends BaseVertex>(
    data: GraphJSON<V>,
    nodeCallback?: (node: V) => V
) {
    return {
        vertices: data.vertices,

        nodes: new Map(
            data.nodes.map((node) => [
                node.id,
                nodeCallback ? nodeCallback(node) : node,
            ])
        ),

        edges: new Map(
            data.edges.map(({ source, targets }) => [source, new Set(targets)])
        ),
    };
}

export function useGraph<V extends BaseVertex, E extends BaseEdge<V>>(
    _defaultState: GraphJSON<V> = initialState as GraphJSON<V>
) {
    const [graph, dispatch] = useReducer(
        reducer<V, E>,
        parseJSON(_defaultState)
    );

    /**
     * Get all vertices in the graph
     * @tests true
     * @returns V[]
     */
    function getVertices() {
        return Array.from(graph.nodes.values());
    }

    /**
     * Get all edges in the graph
     * @tests true
     * @returns E[]
     */
    function getEdges() {
        return Array.from(graph.edges.entries()).flatMap(([source, targets]) =>
            Array.from(targets).map((target) => ({ source, target }))
        );
    }

    /**
     * Get all edges connected to a vertex
     * @tests true
     * @param id | V["id"] - The vertex id
     * @returns E[] | undefined
     */
    function getNodeEdges(id: V["id"]) {
        const targets = graph.edges.get(id);
        return targets
            ? Array.from(targets).map((target) => ({
                  source: id,
                  target,
              }))
            : undefined;
    }

    /**
     * Get a vertex from the graph
     * @tests true
     * @param id | V["id"] - The vertex id
     * @returns V | undefined
     */
    function getVertex(id: V["id"]) {
        return graph.nodes.get(id);
    }

    /**
     * Check if the graph has a vertex
     * @tests true
     * @param id | V["id"] - The vertex id
     * @returns boolean
     */
    function hasVertex(id: V["id"]) {
        return graph.nodes.has(id);
    }

    /**
     * Check if the graph has a directed edge
     * @tests true
     * @param source | V["id"] - The source vertex id
     * @param target | V["id"] - The target vertex id
     * @returns boolean
     */
    function isDirEdge(source: V["id"], target: V["id"]) {
        return (
            graph.edges.get(source)?.has(target) &&
            !graph.edges.get(target)?.has(source)
        );
    }

    /**
     * Check if the graph has any edges
     * @tests true
     * @returns boolean
     */
    function haveEdges() {
        return graph.edges.size > 0;
    }

    /**
     * Add a vertex to the graph
     * @tests true
     * @param vertex | V - A vertex to add to the graph
     */
    function addVertex(vertex: V) {
        dispatch({ type: "ADD_VERTEX", payload: vertex });
    }

    /**
     * Add multiple vertices to the graph
     * @tests true
     * @param vertices | V[] - An array of vertices to add to the graph
     */
    function addVertices(vertices: V[]) {
        dispatch({ type: "ADD_VERTICES", payload: vertices });
    }

    /**
     * Remove a vertex from the graph
     * @tests true
     * @param id | V["id"] - The id of the vertex to remove
     */
    function removeVertex(id: V["id"]) {
        dispatch({ type: "REMOVE_VERTEX", payload: id });
    }

    /**
     * Remove multiple vertices from the graph
     * @tests true
     * @param ids | V["id"][] - An array of ids of vertices to remove
     */
    function removeVertices(ids: V["id"][]) {
        dispatch({ type: "REMOVE_VERTICES", payload: ids });
    }

    /**
     * Update a vertex in the graph
     * @tests true
     * @param node | { id: V["id"] } & Partial<V> - The vertex to update
     */
    function updateVertex(node: { id: V["id"] } & Partial<V>) {
        dispatch({ type: "UPDATE_VERTEX", payload: node });
    }

    /**
     * Update multiple vertices in the graph
     * @tests true
     * @param nodes | Map<string, V> - A map of vertices to update
     */
    function updateVertices(nodes: Map<string, V>) {
        dispatch({ type: "UPDATE_VERTICES", payload: nodes });
    }

    /**
     * Add an edge to the graph
     * @tests true
     * @param edge | E - An edge to add to the graph
     */
    function addEdge(edge: E) {
        if (hasVertex(edge.source) && hasVertex(edge.target))
            dispatch({ type: "ADD_EDGE", payload: edge });
    }

    /**
     * Add multiple edges to the graph
     * @tests true
     * @param edges | E[] - An array of edges to add to the graph
     */
    function addEdges(edges: E[]) {
        dispatch({ type: "ADD_EDGES", payload: edges });
    }

    /**
     * Add a directed edge to the graph
     * @tests true
     * @param edge | E - A directed edge to add to the graph
     */
    function addDirEdge(edge: E) {
        if (hasVertex(edge.source) && hasVertex(edge.target))
            dispatch({ type: "ADD_DIR_EDGE", payload: edge });
    }

    /**
     * Add multiple directed edges to the graph
     * @tests true
     * @param edges | E[] - An array of directed edges to add to the
     */
    function addDirEdges(edges: E[]) {
        dispatch({ type: "ADD_DIR_EDGES", payload: edges });
    }

    /**
     * Remove a directed edge from the graph
     * @tests true
     * @param edge | E - The directed edge to remove
     */
    function removeDirEdge(edge: E) {
        dispatch({ type: "REMOVE_DIR_EDGE", payload: edge });
    }

    /**
     * Remove an edge from the graph
     * @tests true
     * @param edge | E - The edge to remove
     */
    function removeEdge(edge: E) {
        dispatch({ type: "REMOVE_EDGE", payload: edge });
    }

    /**
     * Convert the graph to a JSON object
     * @tests true
     * @param nodeCallback | (node: V) => V - A function to execute on each vertex
     * @param edgeCallback | ([source, targets]: [string, Set<string>]) => { source: string, targets: string[] } - A function to execute on each edge
     * @returns GraphJSON<V>
     */
    function toJSON<T = unknown>(
        nodeCallback?: (node: V) => T,
        edgeCallback?: ([source, targets]: [string, Set<string>]) => {
            source: string;
            targets: string[];
        }
    ) {
        return {
            vertices: graph.vertices,

            nodes: nodeCallback
                ? Array.from(graph.nodes.values()).map(nodeCallback)
                : Array.from(graph.nodes.values()),

            edges: edgeCallback
                ? Array.from(graph.edges.entries()).map(edgeCallback)
                : Array.from(graph.edges.entries()).map(
                      ([source, targets]) => ({
                          source,
                          targets: Array.from(targets),
                      })
                  ),
        };
    }

    /**
     * Convert a JSON object to a graph
     * @tests true
     * @param data | GraphJSON<V> - The JSON object to convert to a graph
     * @param nodeCallback | (node: V) => V - A function to execute on each vertex
     */
    function fromJSON(data: GraphJSON<V>, nodeCallback?: (node: V) => V) {
        const graph = parseJSON(data, nodeCallback);
        dispatch({ type: "SET_GRAPH", payload: graph });
    }

    /**
     * Perform BFS traversal on the entire graph, including disconnected components.
     * @param callback | BFSVertexCallback - A function to execute on each traversed vertex
     * @returns an array of visited vertices in BFS order
     */
    function bfsAll<R = unknown>(callback?: BFSVertexCallback<V, R>) {
        const visited = new Set<string>();
        const result: (V["id"] | R)[] = [];

        for (const start of graph.nodes.keys()) {
            if (!visited.has(start)) {
                const queue = [start];

                while (queue.length > 0) {
                    const current = queue.shift() as V["id"];

                    if (!visited.has(current)) {
                        visited.add(current);

                        if (callback && getVertex(current)) {
                            const callbackResult = callback(
                                getVertex(current) as V,
                                current
                            );
                            if (callbackResult) result.push(callbackResult);
                        } else {
                            result.push(current);
                        }

                        const neighbors = graph.edges.get(current) || [];
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
    }

    return {
        graph,

        // helpers
        getVertices,
        getEdges,
        getVertex,
        getNodeEdges,
        isDirEdge,
        haveEdges,
        hasVertex,

        // dispatchers
        addVertex,
        addVertices,
        removeVertex,
        removeVertices,
        updateVertex,
        updateVertices,

        addEdge,
        addEdges,
        addDirEdge,
        addDirEdges,
        removeEdge,
        removeDirEdge,

        // traverse
        // bfs,
        bfsAll,

        toJSON,
        fromJSON,
    };
}
