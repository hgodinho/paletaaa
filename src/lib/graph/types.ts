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
