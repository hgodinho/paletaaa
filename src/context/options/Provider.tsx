import { useState } from "react";
import { OptionsContext, OptionsStateDefaults } from "./Context";
import { OptionsType } from "./types";
import { useViewPortSize } from "@/lib";

export function OptionsProvider({ children }: React.PropsWithChildren) {
    const [state, setState] = useState<OptionsType>(OptionsStateDefaults);

    const { windowDimensions: viewport } = useViewPortSize();

    const setSidebar = (sidebar: boolean) => {
        setState((prev) => ({ ...prev, sidebar }));
    };

    return (
        <OptionsContext value={{ ...state, viewport, setSidebar }}>
            {children}
        </OptionsContext>
    );
}
