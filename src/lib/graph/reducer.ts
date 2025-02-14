import { BaseEdge, BaseVertex, GraphState } from "./types";

export const GraphActions = {
    SET_GRAPH: "SET_GRAPH",
    ADD_VERTEX: "ADD_VERTEX",
    ADD_VERTICES: "ADD_VERTICES",
    REMOVE_VERTEX: "REMOVE_VERTEX",
    REMOVE_VERTICES: "REMOVE_VERTICES",
    UPDATE_VERTEX: "UPDATE_VERTEX",
    UPDATE_VERTICES: "UPDATE_VERTICES",
    ADD_DIR_EDGE: "ADD_DIR_EDGE",
    ADD_EDGE: "ADD_EDGE",
    ADD_EDGES: "ADD_EDGES",
    ADD_DIR_EDGES: "ADD_DIR_EDGES",
    REMOVE_DIR_EDGE: "REMOVE_DIR_EDGE",
    REMOVE_EDGE: "REMOVE_EDGE",
} as const;

export type GraphAction<V extends BaseVertex, E extends BaseEdge<V>> =
    | { type: typeof GraphActions.SET_GRAPH; payload: GraphState<V> }
    | { type: typeof GraphActions.ADD_VERTEX; payload: V }
    | { type: typeof GraphActions.ADD_VERTICES; payload: V[] }
    | { type: typeof GraphActions.REMOVE_VERTEX; payload: string }
    | { type: typeof GraphActions.REMOVE_VERTICES; payload: string[] }
    | {
          type: typeof GraphActions.UPDATE_VERTEX;
          payload: { id: V["id"] } & Partial<V>;
      }
    | { type: typeof GraphActions.UPDATE_VERTICES; payload: Map<string, V> }
    | { type: typeof GraphActions.ADD_DIR_EDGE; payload: E }
    | { type: typeof GraphActions.ADD_EDGE; payload: E }
    | { type: typeof GraphActions.ADD_EDGES; payload: E[] }
    | { type: typeof GraphActions.ADD_DIR_EDGES; payload: E[] }
    | { type: typeof GraphActions.REMOVE_DIR_EDGE; payload: E }
    | { type: typeof GraphActions.REMOVE_EDGE; payload: E };

export function reducer<V extends BaseVertex, E extends BaseEdge<V>>(
    state: GraphState<V>,
    action: GraphAction<V, E>
): GraphState<V> {
    switch (action.type) {
        case GraphActions.SET_GRAPH: {
            return action.payload;
        }

        case GraphActions.ADD_VERTEX: {
            if (!state.nodes.has(action.payload.id)) {
                const nodes = new Map(state.nodes);
                const edges = new Map(state.edges);
                nodes.set(action.payload.id, action.payload);
                edges.set(action.payload.id, new Set());
                return {
                    ...state,
                    vertices: state.vertices + 1,
                    nodes,
                    edges,
                };
            }
            return state;
        }

        case GraphActions.ADD_VERTICES: {
            const nodes = new Map(state.nodes);
            const edges = new Map(state.edges);
            let verticesCount = 0;

            action.payload.forEach((vertex) => {
                if (!nodes.has(vertex.id)) {
                    nodes.set(vertex.id, vertex);
                    edges.set(vertex.id, new Set());
                    verticesCount++;
                }
            });

            return {
                ...state,
                vertices: state.vertices + verticesCount,
                nodes,
                edges,
            };
        }

        case GraphActions.REMOVE_VERTEX: {
            const nodes = new Map(state.nodes);
            const edges = new Map(state.edges);

            const toRemove = action.payload;

            nodes.delete(toRemove);
            edges.delete(toRemove);

            for (const source of edges.keys()) {
                edges.get(source)?.delete(toRemove);
            }

            return {
                ...state,
                vertices: state.vertices - 1,
                nodes,
                edges,
            };
        }

        case GraphActions.REMOVE_VERTICES: {
            const nodes = new Map(state.nodes);
            const edges = new Map(state.edges);
            let removed = 0;

            action.payload.forEach((id) => {
                if (nodes.has(id)) {
                    nodes.delete(id);
                    edges.delete(id);
                    removed++;

                    for (const source of edges.keys()) {
                        edges.get(source)?.delete(id);
                    }
                }
            });

            return {
                ...state,
                vertices: state.vertices - removed,
                nodes,
                edges,
            };
        }

        case GraphActions.UPDATE_VERTEX: {
            if (state.nodes.has(action.payload.id)) {
                const nodes = new Map(state.nodes);

                nodes.set(action.payload.id, {
                    ...nodes.get(action.payload.id),
                    ...(action.payload as V),
                });

                return {
                    ...state,
                    nodes,
                };
            } else {
                return state;
            }
        }

        case GraphActions.UPDATE_VERTICES: {
            const nodes = new Map(state.nodes);
            let updated = 0;

            action.payload.forEach((vertex, id) => {
                if (nodes.has(id)) {
                    nodes.set(id, {
                        ...nodes.get(id),
                        ...vertex,
                    });
                    updated++;
                }
            });

            return {
                ...state,
                vertices: updated,
                nodes,
            };
        }

        case GraphActions.ADD_DIR_EDGE: {
            const edge = action.payload as E;
            const edges = new Map(state.edges);

            if (edges.has(edge.source)) {
                edges.get(edge.source)!.add(edge.target);
            } else {
                edges.set(edge.source, new Set([edge.target]));
            }

            return {
                ...state,
                edges,
            };
        }

        case GraphActions.ADD_EDGE: {
            const edge = action.payload as E;

            const edges = new Map(state.edges);

            if (edges.has(edge.source)) {
                edges.get(edge.source)!.add(edge.target);
            } else {
                edges.set(edge.source, new Set([edge.target]));
            }

            if (edges.has(edge.target)) {
                edges.get(edge.target)!.add(edge.source);
            } else {
                edges.set(edge.target, new Set([edge.source]));
            }

            return {
                ...state,
                edges,
            };
        }

        case GraphActions.ADD_EDGES: {
            const edgesToAdd = action.payload as E[];
            const edges = new Map(state.edges);

            edgesToAdd.forEach((edge) => {
                if (edges.has(edge.source)) {
                    edges.get(edge.source)!.add(edge.target);
                } else {
                    edges.set(edge.source, new Set([edge.target]));
                }

                if (edges.has(edge.target)) {
                    edges.get(edge.target)!.add(edge.source);
                } else {
                    edges.set(edge.target, new Set([edge.source]));
                }
            });

            return {
                ...state,
                edges,
            };
        }

        case GraphActions.ADD_DIR_EDGES: {
            const edgesToAdd = action.payload as E[];
            const edges = new Map(state.edges);

            edgesToAdd.forEach((edge) => {
                if (edges.has(edge.source)) {
                    edges.get(edge.source)!.add(edge.target);
                } else {
                    edges.set(edge.source, new Set([edge.target]));
                }
            });

            return {
                ...state,
                edges,
            };
        }

        case GraphActions.REMOVE_DIR_EDGE: {
            const toRemove = action.payload as E;
            const edges = new Map(state.edges);

            if (edges.has(toRemove.source)) {
                edges.get(toRemove.source)!.delete(toRemove.target);
            }

            return {
                ...state,
                edges,
            };
        }

        case GraphActions.REMOVE_EDGE: {
            const toRemove = action.payload as E;
            const edges = new Map(state.edges);

            if (edges.has(toRemove.source)) {
                edges.get(toRemove.source)!.delete(toRemove.target);
            }

            if (edges.has(toRemove.target)) {
                edges.get(toRemove.target)!.delete(toRemove.source);
            }

            return {
                ...state,
                edges,
            };
        }

        default: {
            return state;
        }
    }
}
