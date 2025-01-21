import React, { useCallback, useMemo, useState } from "react";

import {
    PaletteContext,
    PaletteContextDefault,
    PaletteContextType,
} from "./Context";
import ColorContrastChecker from "color-contrast-checker";
import { useGraph } from "@/lib";

import type { Node, Link } from "./types";
import { parseColor } from "react-aria-components";
import type { Color } from "./Context";

export function PaletteProvider({
    children,
}: React.PropsWithChildren<{ [key: string]: unknown }>) {
    const [palette, setPalette] = useState<PaletteContextType>(
        PaletteContextDefault
    );

    const { graph, ...graphActions } = useGraph<Node, Link>();

    const validator = new ColorContrastChecker();

    const contrastColor = (colorA: string, colorB: string) => {
        return validator?.check(colorA, colorB, 18).WCAG_AAA
            ? "white"
            : "black";
    }

    const onColorAdd = () => {
        graphActions.addVertex({
            id: Math.random().toString(36).substring(2, 7),
            color: {
                data: parseColor(
                    `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${Math.random() * 100
                    }%)`
                ),
                title: "",
            },
        });
    };

    const getColor = (id: string): Color | undefined => {
        return graphActions.getNode(id)?.color;
    };

    const updateColorName = (id: string, title: string) => {
        graphActions.updateVertex({
            id,
            color: {
                ...getColor(id),
                title,
            },
        });
    };

    const updateColorData = (id: string, data: Color) => {
        graphActions.updateVertex({
            id,
            color: {
                ...getColor(id),
                ...data,
            },
        });
    };

    return (
        <PaletteContext.Provider
            value={{
                ...palette,
                setPalette,

                getColor,
                contrastColor,
                onColorAdd,
                updateColorName,
                updateColorData,

                ...graph,
                ...graphActions,

                validator,
            }}
        >
            {children}
        </PaletteContext.Provider>
    );
}
