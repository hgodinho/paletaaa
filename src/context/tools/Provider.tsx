import { useState } from "react";
import { ToolsContext } from "./Context";
import { ToolsState } from "./types";
import { useVitePostHog } from "vite-plugin-posthog/react";
// import { usePaletteContext } from "../palette";

export function ToolsProvider({ children }: React.PropsWithChildren) {
    const [visible, setVisible] = useState<boolean>(false);

    const [state, setState] = useState<ToolsState>({
        labels: { active: true },
        magnet: { active: false },
        background: { active: false },
    });

    const posthog = useVitePostHog();

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
                setVisible,
                state,

                toggleLabels,
                toggleMagnet,
                toggleBackground,
            }}
        >
            {children}
        </ToolsContext>
    );
}
