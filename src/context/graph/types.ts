import { LinkObject, NodeObject } from "react-force-graph-2d";

export type Node = NodeObject & {
    id: string;
};

export type Link = LinkObject & {
    source: string;
    target: string;
};
