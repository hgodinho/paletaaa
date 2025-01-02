import React, { useCallback, useMemo, useState } from "react";

import {
    PaletteContext,
    PaletteContextDefault,
    PaletteContextType,
} from "./Context";
import { ColorType } from "@/components";
import ColorContrastChecker from "color-contrast-checker";

export function PaletteProvider({
    children,
}: React.PropsWithChildren<{ [key: string]: unknown }>) {
    const [palette, setPalette] = useState<PaletteContextType>(
        PaletteContextDefault
    );

    const validator = useMemo(() => {
        return new ColorContrastChecker();
    }, []);

    const pushColor = useCallback((color: ColorType) => {
        setPalette((prev: PaletteContextType) => ({
            ...prev,
            colors: [...(prev.colors || []), color],
        }));
    }, []);

    const editColor = useCallback((color: ColorType, index: number) => {
        setPalette((prev: PaletteContextType) => {
            const colors = [...(prev.colors || [])];
            colors[index] = color;
            return { ...prev, colors };
        });
    }, []);

    const deleteColor = useCallback((index: number) => {
        setPalette((prev: PaletteContextType) => {
            const colors = [...(prev.colors || [])];
            colors.splice(index, 1);
            return { ...prev, colors };
        });
    }, []);

    const backgroundContrast = useMemo(() => {
        return validator?.check(
            palette.background?.value || "#FFFFFF",
            "#000000",
            18
        ).WCAG_AAA
            ? "black"
            : "white";
    }, [palette.background?.value]);

    return (
        <PaletteContext.Provider
            value={{
                ...palette,
                backgroundContrast,
                setPalette,
                pushColor,
                editColor,
                deleteColor,
                validator,
            }}
        >
            {children}
        </PaletteContext.Provider>
    );
}
