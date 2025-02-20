import { useGraph } from "@/lib";
import { Dispatch, SetStateAction } from "react";
import {
    ForceGraphMethods,
    ForceGraphProps,
    NodeObject,
} from "react-force-graph-2d";
import { Node as NodeType, Link as LinkType } from "@/lib";
import { Color } from "../palette/Context";

export type Viewport = {
    width: number;
    height: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

export type Node = NodeType<
    NodeObject & {
        id: string;
        color: Color;
        expanded: boolean;
    }
>;

export type Link = LinkType<Node>;

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
