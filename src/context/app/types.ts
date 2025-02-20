import { useGraph } from "@/lib";
import { Dispatch, SetStateAction } from "react";
import {
    ForceGraphMethods,
    ForceGraphProps,
    LinkObject,
    NodeObject,
} from "react-force-graph-2d";

export type Node = NodeObject & {
    id: string;
};

export type Link = LinkObject & {
    source: string;
    target: string;
};

export type Viewport = {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

export type AppType = ReturnType<typeof useGraph<Node, Link>> & {
    graphRef?: React.RefObject<ForceGraphMethods<Node, Link> | null>;
    options: ForceGraphProps<Node, Link>;
    viewport: Viewport;
    sidebar: boolean;
    scale: number;
    setScale: Dispatch<SetStateAction<number>>;

    updateStorage: () => void;
    setSidebar: Dispatch<SetStateAction<boolean>>;
};
