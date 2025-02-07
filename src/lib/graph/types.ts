import { Color } from "@/context";

export type BFSVertexCallback<V, R = void> = (vertex: V, current: string) => R;

export type BaseVertex = {
    id: string;
};

export type BaseEdge<V extends BaseVertex = BaseVertex> = {
    source: V["id"]; // source: A
    target: V["id"]; // source: A
};

export type Node = BaseVertex & {
    color: Color;
};

export type Link = BaseEdge;

export type GraphNodes<V extends BaseVertex> = Map<V["id"], V>;

export type GraphEdges<V extends BaseVertex> = Map<V["id"], Set<V["id"]>>;

export type GraphState<V extends BaseVertex> = {
    vertices: number;
    nodes: GraphNodes<V>;
    edges: GraphEdges<V>;
};

export type GraphJSON<V extends BaseVertex> = {
    vertices: number;
    nodes: V[];
    edges: { source: string; targets: string[] }[];
};
