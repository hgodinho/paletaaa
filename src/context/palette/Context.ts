import { createContext } from "react";
import {
    Color as PrimitiveColor,
    ColorSpace,
    parseColor,
} from "react-aria-components";
import { useGraph } from "@/lib";
import { Link, Node } from "./types";

export type Color = {
    title?: string;
    data: PrimitiveColor;
};

export type PaletteContextType = {
    name: string;
    colorSpace: ColorSpace;
    background: Color;
    colors?: Color[];
    validator?: ColorContrastChecker;
} & ReturnType<typeof useGraph<Node, Link>>;

export type PaletteContextCallback = {
    setPalette: (palette: PaletteContextType) => void;
    onColorAdd: () => void;
    contrastColor: (colorA: string, colorB: string) => "black" | "white";
    updateColorName: (id: string, title: string) => void;
    updateColorData: (id: string, data: Color) => void;
};

export const PaletteCallback: PaletteContextCallback = {
    setPalette: () => {},
    onColorAdd: () => {},
    contrastColor: () => "black",
    updateColorName: () => {},
    updateColorData: () => {},
};

export const UseGraphCallbacks: ReturnType<typeof useGraph<Node, Link>> = {
    graph: {
        vertices: 0,
        nodes: new Map(),
        adjList: new Map(),
    },
    getNodes: () => [],
    getLinks: () => [],
    getNode: () => undefined,
    addVertex: () => {},
    bfsAll: () => [],
    updateVertex: () => {},
    removeVertex: () => {},
    addDirEdge: () => {},
    removeDirEdge: () => {},
    addEdge: () => {},
    getNodeEdges: () => [],
    removeEdge: () => {},
    haveEdges: () => false,
    isDirEdge: () => false,
};

export const PaletteContextDefault: PaletteContextType = {
    name: "",
    colorSpace: "hsl",
    background: { data: parseColor("hsl(50, 85%, 85%)") },
    ...UseGraphCallbacks,
};

export const PaletteContext = createContext<
    PaletteContextType & PaletteContextCallback
>({ ...PaletteContextDefault, ...PaletteCallback });
