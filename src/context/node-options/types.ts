import { RefCallback } from "react";
import { ForceGraphMethods } from "react-force-graph-2d";
import { Link, Node } from "../app";

export type NodeOptionsType = {
    ref: RefCallback<HTMLElement & ForceGraphMethods<Node, Link>> | null;
    floatingRef: RefCallback<HTMLElement> | null;
    floatingStyles: React.CSSProperties;
    selected: Node["id"] | undefined;
    node?: Node;
    connection?: Partial<Link>;

    referenceProps: (
        userProps?: React.HTMLProps<Element>
    ) => Record<string, unknown>;
    floatingProps: (
        userProps?: React.HTMLProps<HTMLElement>
    ) => Record<string, unknown>;

    setSelected: (node: Node["id"] | undefined) => void;

    removeNode: (id: Node["id"]) => void;
    duplicateNode: (id: Node["id"]) => void;

    setConnection: (id: Node["id"]) => void;
    resetConnection: () => void;
};
