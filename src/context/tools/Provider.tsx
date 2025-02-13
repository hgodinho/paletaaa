import { useState } from "react";
import { ToolsContext } from "./Context";
import { ToolsState } from "./types";
// import { usePaletteContext } from "../palette";

export function ToolsProvider({ children }: React.PropsWithChildren) {
    const [visible, setVisible] = useState<boolean>(false);

    const [state, setState] = useState<ToolsState>({
        labels: { active: true },
        magnet: { active: false },
        background: { active: false },
    });

    const toggleLabels = () => {
        setState({
            ...state,
            labels: { active: !state.labels.active },
        });
    };

    const toggleMagnet = () => {
        setState({
            ...state,
            magnet: { active: !state.magnet.active },
        });
    };

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
