import { Node } from "@/context";
import { createContext } from "react";
import { Color as PrimitiveColor, ColorSpace } from "react-aria-components";

export type Color = {
    title?: string;
    id: string;
    data: PrimitiveColor;
};

export type PalleteContextState = {
    title: string;
    colorSpace: ColorSpace;
    selected?: string;
};

export type PaletteContextType = {
    background?: string;
    validator?: ColorContrastChecker;
} & PalleteContextState;

export type PaletteContextCallback = {
    expandColor: (id: string) => void;
    onTitleChange: (title: string) => void;
    getColor: (id: string) => Color | undefined;
    getColorHex: (id: string) => string | undefined;
    getBackground: () => Color | undefined;
    getBackgroundHex: () => string;
    onColorAdd: () => void;
    onColorDuplicate: (id: string) => void;
    onColorRemove: (id: string) => void;
    contrastColor: (
        foreground: string,
        background: string
    ) => "black" | "white";
    updateColorName: (id: string, title: string) => void;
    updateColorData: (id: string, data: Color) => void;
    onColorSelected: (id: string | null) => void;
    setBackground: (data: string | undefined) => void;
    getColors: () => Node[];
    onLinkAdd: (source: string, target: string, directed?: boolean) => void;
    onLinkRemove: (source: string, target: string) => void;
};

export const PaletteCallback: PaletteContextCallback = {
    expandColor: () => {},
    onTitleChange: () => {},
    getColor: () => undefined,
    getColorHex: () => undefined,
    getBackground: () => undefined,
    getBackgroundHex: () => "#FFF",
    onColorAdd: () => {},
    onColorDuplicate: () => {},
    onColorRemove: () => {},
    contrastColor: () => "black",
    updateColorName: () => {},
    updateColorData: () => {},
    onColorSelected: () => {},
    getColors: () => [],
    setBackground: () => {},
    onLinkAdd: () => {},
    onLinkRemove: () => {},
};

export const PaletteContextDefault: PaletteContextType = {
    title: "",
    colorSpace: "hsl",
};

export const PaletteContext = createContext<
    PaletteContextType & PaletteContextCallback
>({ ...PaletteContextDefault, ...PaletteCallback });
