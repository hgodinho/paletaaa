import React, { useState } from "react";

import {
    PaletteContext,
    PaletteContextDefault,
    PaletteContextType,
} from "./Context";
import ColorContrastChecker from "color-contrast-checker";

import { parseColor } from "react-aria-components";
import type { Color } from "./Context";
import { useAppContext } from "../app";
import { getRandomId } from "@/lib";

export function PaletteProvider({
    children,
}: React.PropsWithChildren<{ [key: string]: unknown }>) {
    const { graph, ...graphActions } = useAppContext();

    const [state, setPalette] = useState<PaletteContextType>(
        PaletteContextDefault
    );

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

    const contrastColor = (
        colorA: string,
        colorB: string,
        level: "WCAG_AAA" | "WCAG_AA" = "WCAG_AAA"
    ) => {
        return validator?.check(colorA, colorB, 18)[level] ? "white" : "black";
    };

    const onColorAdd = () => {
        const id = getRandomId();
        graphActions.addVertex({
            id,
            expanded: true,
            val: 1.5,
            color: {
                data: parseColor(
                    `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${
                        Math.random() * 100
                    }%)`
                ),
                id,
                title: "",
            },
        });
    };

    const getColor = (id: string): Color | undefined => {
        return graphActions.getNode(id)?.color;
    };

    const getColorHex = (id: string): string | undefined => {
        return getColor(id)?.data.toString("hex");
    };

    const getBackground = () => {
        return getColor(state.background || "");
    };

    const setBackground = (data: string | undefined) => {
        setPalette({
            ...state,
            background: data,
        });
    };

    const getBackgroundHex = () => {
        return getBackground()?.data.toString("hex") || "#FFF";
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

    const expandColor = (id: string) => {
        const updated = new Map(graph.nodes);
        for (const [key, value] of updated) {
            if (key === id) {
                updated.set(key, {
                    ...value,
                    expanded: !value.expanded,
                    val: value.expanded ? 1 : 1.5,
                });
            } else {
                updated.set(key, {
                    ...value,
                    expanded: false,
                    val: 1,
                });
            }
        }
        graphActions.updateVertices(updated);
    };

    const getColors = () => {
        return Array.from(graph.nodes.values());
    };

    return (
        <PaletteContext.Provider
            value={{
                ...state,

                expandColor,
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
                getColors,
                setBackground,

                validator,
            }}
        >
            {children}
        </PaletteContext.Provider>
    );
}
