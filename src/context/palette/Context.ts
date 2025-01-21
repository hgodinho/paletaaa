import { createContext } from "react";
import { Color as PrimitiveColor, ColorSpace } from "react-aria-components";

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
} & PalleteContextState;

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

export const PaletteContextDefault: PaletteContextType = {
    title: "",
    colorSpace: "hsl",
};

export const PaletteContext = createContext<
    PaletteContextType & PaletteContextCallback
>({ ...PaletteContextDefault, ...PaletteCallback });
