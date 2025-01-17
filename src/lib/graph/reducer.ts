import { BaseEdge, BaseVertex } from "./types";
import { GraphState } from "./useGraph";

export type GraphAction<V extends BaseVertex, E extends BaseEdge<V>> =
    | { type: "ADD_VERTEX"; payload: V }
    | { type: "REMOVE_VERTEX"; payload: string }
    | { type: "UPDATE_VERTEX"; payload: V }
    | { type: "ADD_DIR_EDGE"; payload: E }
    | { type: "ADD_EDGE"; payload: E }
    | { type: "REMOVE_DIR_EDGE"; payload: E }
    | { type: "REMOVE_EDGE"; payload: E };

export function reducer<V extends BaseVertex, E extends BaseEdge<V>>(
    state: GraphState<V>,
    action: GraphAction<V, E>
): GraphState<V> {
    switch (action.type) {
        case "ADD_VERTEX":
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

        case "REMOVE_VERTEX":
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

        case "UPDATE_VERTEX":
            console.log("UPDATE_VERTEX", {
                node: state.nodes.get(action.payload.id),
                payload: action.payload,
            });

            return {
                ...state,
                nodes: new Map([
                    ...state.nodes,
                    [
                        (action.payload as V).id,
                        {
                            // ...state.nodes.get((action.payload as V).id),
                            ...(action.payload as V),
                        },
                    ],
                ]),
            };

        case "ADD_DIR_EDGE":
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

        case "ADD_EDGE":
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

        case "REMOVE_DIR_EDGE":
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

        case "REMOVE_EDGE":
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

        default:
            return state;
    }
}
