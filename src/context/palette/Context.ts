import { createContext } from "react";
import { Color as PrimitiveColor, ColorSpace } from "react-aria-components";
import { useGraph } from "@/lib";
import { Link, Node } from "./types";

export type Color = {
    title?: string;
    data: PrimitiveColor;
};

export type PalleteContextState = {
    title: string;
    colorSpace: ColorSpace;
    selected?: string;
};

export type PaletteContextType = {
    validator?: ColorContrastChecker;
} & PalleteContextState &
    ReturnType<typeof useGraph<Node, Link>>;

export type PaletteContextCallback = {
    onTitleChange: (title: string) => void;
    getColor: (id: string) => Color | undefined;
    getColorHex: (id: string) => string | undefined;
    getBackground: () => Color | undefined;
    getBackgroundHex: () => string | undefined;
    onColorAdd: () => void;
    contrastColor: (colorA: string, colorB: string) => "black" | "white";
    updateColorName: (id: string, title: string) => void;
    updateColorData: (id: string, data: Color) => void;
    onColorSelected: (id: string | null) => void;
};

export const PaletteCallback: PaletteContextCallback = {
    onTitleChange: () => {},
    getColor: () => undefined,
    getColorHex: () => undefined,
    getBackground: () => undefined,
    getBackgroundHex: () => undefined,
    onColorAdd: () => {},
    contrastColor: () => "black",
    updateColorName: () => {},
    updateColorData: () => {},
    onColorSelected: () => {},
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
    title: "",
    colorSpace: "hsl",
    ...UseGraphCallbacks,
};

export const PaletteContext = createContext<
    PaletteContextType & PaletteContextCallback
>({ ...PaletteContextDefault, ...PaletteCallback });
