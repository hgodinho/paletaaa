import { Node } from "@/components";
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
    contrastColor: (
        foreground: string,
        background: string
    ) => "black" | "white";
    updateColorName: (id: string, title: string) => void;
    updateColorData: (id: string, data: Color) => void;
    onColorSelected: (id: string | null) => void;
    setBackground: (data: string | undefined) => void;
    getColors: () => Node[];
};

export const PaletteCallback: PaletteContextCallback = {
    expandColor: () => {},
    onTitleChange: () => {},
    getColor: () => undefined,
    getColorHex: () => undefined,
    getBackground: () => undefined,
    getBackgroundHex: () => "#FFF",
    onColorAdd: () => {},
    contrastColor: () => "black",
    updateColorName: () => {},
    updateColorData: () => {},
    onColorSelected: () => {},
    getColors: () => [],
    setBackground: () => {},
};

export const PaletteContextDefault: PaletteContextType = {
    title: "",
    colorSpace: "hsl",
};

export const PaletteContext = createContext<
    PaletteContextType & PaletteContextCallback
>({ ...PaletteContextDefault, ...PaletteCallback });
