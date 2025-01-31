import { BaseEdge, BaseVertex } from "./types";
import { GraphState } from "./useGraph";

export const GraphActions = {
    ADD_VERTEX: "ADD_VERTEX",
    REMOVE_VERTEX: "REMOVE_VERTEX",
    UPDATE_VERTEX: "UPDATE_VERTEX",
    UPDATE_VERTICES: "UPDATE_VERTICES",
    ADD_DIR_EDGE: "ADD_DIR_EDGE",
    ADD_EDGE: "ADD_EDGE",
    REMOVE_DIR_EDGE: "REMOVE_DIR_EDGE",
    REMOVE_EDGE: "REMOVE_EDGE",
} as const;

export type GraphAction<V extends BaseVertex, E extends BaseEdge<V>> =
    | { type: typeof GraphActions.ADD_VERTEX; payload: V }
    | { type: typeof GraphActions.REMOVE_VERTEX; payload: string }
    | { type: typeof GraphActions.UPDATE_VERTEX; payload: V }
    | { type: typeof GraphActions.UPDATE_VERTICES; payload: Map<string, V> }
    | { type: typeof GraphActions.ADD_DIR_EDGE; payload: E }
    | { type: typeof GraphActions.ADD_EDGE; payload: E }
    | { type: typeof GraphActions.REMOVE_DIR_EDGE; payload: E }
    | { type: typeof GraphActions.REMOVE_EDGE; payload: E };

export function reducer<V extends BaseVertex, E extends BaseEdge<V>>(
    state: GraphState<V>,
    action: GraphAction<V, E>
): GraphState<V> {
    switch (action.type) {
        case GraphActions.ADD_VERTEX: {
            return {
                ...state,
                vertices: state.vertices + 1,
                nodes: new Map([
                    ...state.nodes,
                    [(action.payload as V).id, action.payload as V],
                ]),
                adjList: new Map([
                    ...state.adjList,
                    [(action.payload as V).id, new Set()],
                ]),
            };
        }

        case GraphActions.REMOVE_VERTEX: {
            const nodes = new Map(state.nodes);
            const removeAdjList = new Map(state.adjList);

            nodes.delete(action.payload);
            removeAdjList.delete(action.payload);

            return {
                ...state,
                vertices: state.vertices - 1,
                nodes,
                adjList: removeAdjList,
            };
        }

        case GraphActions.UPDATE_VERTEX: {
            return {
                ...state,
                nodes: new Map([
                    ...state.nodes,
                    [
                        (action.payload as V).id,
                        {
                            ...state.nodes.get((action.payload as V).id),
                            ...(action.payload as V),
                        },
                    ],
                ]),
            };
        }

        case GraphActions.UPDATE_VERTICES: {
            return {
                ...state,
                nodes: action.payload as Map<string, V>,
            };
        }

        case GraphActions.ADD_DIR_EDGE: {
            const edge = action.payload as E;
            const addAdjList = new Map(state.adjList);
            const source = addAdjList.get(edge.source);

            if (source) {
                source.add(edge.target);
            }

            return {
                ...state,
                adjList: addAdjList,
            };
        }

        case GraphActions.ADD_EDGE: {
            const addEdge = action.payload as E;
            const addAdjListEdge = new Map(state.adjList);
            const sourceEdge = addAdjListEdge.get(addEdge.source);
            const targetEdge = addAdjListEdge.get(addEdge.target);

            if (sourceEdge) {
                sourceEdge.add(addEdge.target);
            }

            if (targetEdge) {
                targetEdge.add(addEdge.source);
            }

            return {
                ...state,
                adjList: addAdjListEdge,
            };
        }

        case GraphActions.REMOVE_DIR_EDGE: {
            const removeEdge = action.payload as E;
            const removeAdjListEdge = new Map(state.adjList);
            const sourceRemove = removeAdjListEdge.get(removeEdge.source);

            if (sourceRemove) {
                sourceRemove.delete(removeEdge.target);
            }

            return {
                ...state,
                adjList: removeAdjListEdge,
            };
        }

        case GraphActions.REMOVE_EDGE: {
            const removeEdgeBoth = action.payload as E;
            const removeAdjListBoth = new Map(state.adjList);
            const sourceRemoveBoth = removeAdjListBoth.get(
                removeEdgeBoth.source
            );
            const targetRemoveBoth = removeAdjListBoth.get(
                removeEdgeBoth.target
            );

            if (sourceRemoveBoth) {
                sourceRemoveBoth.delete(removeEdgeBoth.target);
            }

            if (targetRemoveBoth) {
                targetRemoveBoth.delete(removeEdgeBoth.source);
            }

            return {
                ...state,
                adjList: removeAdjListBoth,
            };
        }

        default: {
            return state;
        }
    }
}
