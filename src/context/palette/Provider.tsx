import React, { useState } from "react";

import {
    PaletteContext,
    PaletteContextDefault,
    PaletteContextType,
} from "./Context";
import ColorContrastChecker from "color-contrast-checker";

import { parseColor } from "react-aria-components";
import type { Color } from "./Context";
import { useGraphContext } from "../graph";

export function PaletteProvider({
    children,
}: React.PropsWithChildren<{ [key: string]: unknown }>) {
    const [state, setPalette] = useState<PaletteContextType>(
        PaletteContextDefault
    );

    const { graph, ...graphActions } = useGraphContext();

    const validator = new ColorContrastChecker();

    const onColorSelected = (id: string | null) => {
        if (id && graph.nodes.has(id) && id !== state.selected) {
            setPalette({
                ...state,
                selected: id,
            });
        }
    };

    const onTitleChange = (title: string) => {
        setPalette({
            ...state,
            title,
        });
    };

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

    const getColorHex = (id: string): string | undefined => {
        return getColor(id)?.data.toString("hex");
    }

    const getBackground = () => {
        return getColor("background")
    }

    const getBackgroundHex = () => {
        return getBackground()?.data.toString("hex");
    }

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
                ...state,

                onTitleChange,
                getColor,
                getColorHex,
                getBackground,
                getBackgroundHex,
                contrastColor,
                onColorAdd,
                updateColorName,
                updateColorData,
                onColorSelected,

                validator,
            }}
        >
            {children}
        </PaletteContext.Provider>
    );
}
