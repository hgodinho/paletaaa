import { useState } from "react";
import { OptionsContext, OptionsStateDefaults } from "./Context";
import { OptionsType } from "./types";
import { useViewPortSize } from "@/lib";

export function OptionsProvider({ children }: React.PropsWithChildren) {
    const { windowDimensions: viewport } = useViewPortSize();

    const [state, setState] = useState<OptionsType>({
        ...OptionsStateDefaults,
        sidebar: viewport.isMobile ? false : true,
    });

    const setSidebar = (sidebar: boolean) => {
        setState((prev) => ({ ...prev, sidebar }));
    };

    return (
        <OptionsContext value={{ ...state, viewport, setSidebar }}>
            {children}
        </OptionsContext>
    );
}
