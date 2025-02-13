import { useGraph } from "@/lib";
import { Dispatch, SetStateAction } from "react";
import { LinkObject, NodeObject } from "react-force-graph-2d";

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
    updateStorage: () => void;

    viewport: Viewport;

    sidebar: boolean;
    setSidebar: Dispatch<SetStateAction<boolean>>;
};
