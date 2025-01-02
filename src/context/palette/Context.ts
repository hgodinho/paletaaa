import { ColorType } from "@/components";
import { createContext } from "react";

export type PaletteContextType = {
    name: string;
    background?: ColorType;
    colors?: ColorType[];
    validator?: ColorContrastChecker;
    backgroundContrast?: "black" | "white";
};

export type PaletteContextCallback = {
    setPalette: (palette: PaletteContextType) => void;
    pushColor: (color: ColorType) => void;
    editColor: (color: ColorType, index: number) => void;
    deleteColor: (index: number) => void;
};

export const PaletteCallback: PaletteContextCallback = {
    setPalette: () => {},
    pushColor: () => {},
    editColor: () => {},
    deleteColor: () => {},
};

export const PaletteContextDefault: PaletteContextType = {
    name: "",
    background: { value: "#ffefc4", title: "background" },
};

export const PaletteContext = createContext<
    PaletteContextType & PaletteContextCallback
>({ ...PaletteContextDefault, ...PaletteCallback });
