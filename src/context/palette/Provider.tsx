import React, { useState } from "react";

import {
    PaletteContext,
    PaletteContextDefault,
    PaletteContextType,
} from "./Context";
import ColorContrastChecker from "color-contrast-checker";
import { useVitePostHog } from "vite-plugin-posthog/react";

import { parseColor } from "react-aria-components";
import type { Color } from "./Context";
import { useAppContext } from "../app";
import { getRandomId } from "@/lib";

export function PaletteProvider({
    children,
}: React.PropsWithChildren<{ [key: string]: unknown }>) {
    const { graph, ...graphActions } = useAppContext();

    const posthog = useVitePostHog();

    const [state, setPalette] = useState<PaletteContextType>(
        PaletteContextDefault
    );

    const validator = new ColorContrastChecker();

    /**
     * Select a color in the palette
     * @param id | id of the color
     */
    const onColorSelected = (id: string | null) => {
        if (id && graph.nodes.has(id) && id !== state.selected) {
            setPalette({
                ...state,
                selected: id,
            });
        }
    };

    /**
     * Update the title of the palette
     * @param title | new title of the palette
     */
    const onTitleChange = (title: string) => {
        setPalette({
            ...state,
            title,
        });
    };

    /**
     * Get the contrast color between two colors
     * @param colorA | color A
     * @param colorB | color B
     * @param level | level of contrast
     * @returns | the contrast color
     */
    const contrastColor = (
        colorA: string,
        colorB: string,
        level: "WCAG_AAA" | "WCAG_AA" = "WCAG_AAA"
    ) => {
        return validator?.check(colorA, colorB, 18)[level] ? "white" : "black";
    };

    /**
     * Add a color to the palette
     *
     * @posthog color_add event
     */
    const onColorAdd = () => {
        const id = getRandomId();
        const color = {
            data: parseColor(
                `hsl(${Math.random() * 360}, ${Math.random() * 100}%, ${
                    Math.random() * 100
                }%)`
            ),
            id,
            title: "",
        };

        graphActions.addVertex({
            id,
            expanded: true,
            val: 1.5,
            color,
        });

        posthog?.capture("color_add", {
            ...color,
            data: color.data.toString("hex"),
        });
    };

    /**
     * Remove a color from the palette
     * @param id | id of the color
     *
     * @posthog color_remove event
     */
    const onColorRemove = (id: string) => {
        graphActions.removeVertex(id);

        posthog?.capture("color_remove", {
            id,
        });
    };

    /**
     * Get a color by its id
     * @param id | id of the color
     * @returns the color
     */
    const getColor = (id: string): Color | undefined => {
        return graphActions.getVertex(id)?.color;
    };

    /**
     * Get the hex value of a color
     * @param id | id of the color
     * @returns the hex value of the color
     */
    const getColorHex = (id: string): string | undefined => {
        return getColor(id)?.data.toString("hex");
    };

    /**
     * Get the background color of the palette
     * @returns the background color of the palette
     */
    const getBackground = () => {
        return getColor(state.background || "");
    };

    /**
     * Set the background color of the palette
     * @param id | id of the color
     *
     * @posthog background_change event
     */
    const setBackground = (id: string | undefined) => {
        setPalette({
            ...state,
            background: id,
        });
        if (id)
            posthog?.capture("background_change", {
                id,
                color: getColor(id)?.data.toString("hex"),
            });
    };

    /**
     * Get the background color of the palette
     * @returns the background color of the palette
     */
    const getBackgroundHex = () => {
        return getBackground()?.data.toString("hex") || "#FFF";
    };

    /**
     * Update the title of a color
     * @param id | id of the color
     * @param title | new title of the color
     *
     * @posthog color_rename event
     */
    const updateColorName = (id: string, title: string) => {
        const color = getColor(id);
        if (!color) return;

        graphActions.updateVertex({
            id,
            color: {
                ...color,
                title,
            },
        });

        posthog?.capture("color_rename", {
            id,
        });
    };

    /**
     * Update the data of a color
     * @param id | id of the color
     * @param data | new data of the color
     *
     * @posthog color_update event
     */
    const updateColorData = (id: string, data: Color) => {
        graphActions.updateVertex({
            id,
            color: {
                ...getColor(id),
                ...data,
            },
        });

        posthog?.capture("color_update", {
            id,
            data: data.data.toString("hex"),
        });
    };

    /**
     * Expand a color in the palette
     * @param id | id of the color
     */
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

    /**
     * Get all the colors in the palette
     * @returns all the colors in the palette
     */
    const getColors = () => {
        return Array.from(graph.nodes.values());
    };

    /**
     * Link two colors in the palette
     * @param source | id of the source color
     * @param target | id of the target color
     * @param directed | whether the link is directed
     *
     * @posthog link_add event
     */
    const onLinkAdd = (
        source: string,
        target: string,
        directed: boolean = false
    ) => {
        if (directed) {
            graphActions.addDirEdge({ source, target });
        } else {
            graphActions.addEdge({ source, target });
        }

        posthog?.capture("link_add", {
            source,
            target,
            directed,
        });
    };

    /**
     * Remove a link between two colors in the palette
     * @param source | id of the source color
     * @param target | id of the target color
     *
     * @posthog link_remove event
     */
    const onLinkRemove = (source: string, target: string) => {
        if (graphActions.isDirEdge(source, target)) {
            graphActions.removeDirEdge({ source, target });
        } else {
            graphActions.removeEdge({ source, target });
        }

        posthog?.capture("link_remove", {
            source,
            target,
        });
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
                onColorRemove,
                updateColorName,
                updateColorData,
                onColorSelected,
                getColors,
                setBackground,
                onLinkAdd,
                onLinkRemove,

                validator,
            }}
        >
            {children}
        </PaletteContext.Provider>
    );
}
