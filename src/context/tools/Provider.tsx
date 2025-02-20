import { useState } from "react";
import { ToolsContext } from "./Context";
import { ToolsState } from "./types";
import { useVitePostHog } from "vite-plugin-posthog/react";
import { useAppContext } from "../app";

export function ToolsProvider({ children }: React.PropsWithChildren) {
    const { graphRef, options, scale } = useAppContext();

    const [visible, setVisible] = useState<boolean>(false);

    const [state, setState] = useState<ToolsState>({
        labels: { active: true },
        magnet: { active: false },
        background: { active: false },
    });

    const posthog = useVitePostHog();

    const zoom = {
        zoomToFit: () => {
            if (graphRef?.current === null) return;
            graphRef?.current.zoomToFit(300, 128);
        },
        zoom: (scale: number) => {
            if (graphRef?.current === null) return;
            graphRef?.current.zoom(scale, 300);
        },
        visible: visible,
        min: options.minZoom || 0.1,
        max: options.maxZoom || 2,
        referenceScale: scale,
    };

    /**
     * Toggle the visibility of the labels
     * @returns | void
     *
     * @posthog toggle_labels event
     */
    const toggleLabels = () => {
        const active = !state.labels.active;
        setState({
            ...state,
            labels: { active },
        });
        posthog?.capture("toggle_labels", {
            active,
        });
    };

    /**
     * Toggle the magnet
     * @returns | void
     *
     * @posthog toggle_magnet event
     */
    const toggleMagnet = () => {
        const active = !state.magnet.active;
        setState({
            ...state,
            magnet: { active },
        });
        posthog?.capture("toggle_magnet", {
            active,
        });
    };

    /**
     * Toggle the background
     * @param value | optional value to set the background
     * @returns | void
     */
    const toggleBackground = (value?: boolean) => {
        setState({
            ...state,
            background: {
                ...state.background,
                active:
                    typeof value !== "undefined"
                        ? value
                        : !state.background.active,
            },
        });
    };

    return (
        <ToolsContext
            value={{
                visible,
                state,
                setVisible,
                zoom,

                toggleLabels,
                toggleMagnet,
                toggleBackground,
            }}
        >
            {children}
        </ToolsContext>
    );
}
