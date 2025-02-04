import { useEffect, useState } from "react";
import { OptionsContext, OptionsStateDefaults } from "./Context";
import { OptionsType } from "./types";

export function OptionsProvider({ children }: React.PropsWithChildren) {
    const [state, setState] = useState<OptionsType>(OptionsStateDefaults);

    const setSidebar = (sidebar: boolean) => {
        setState((prev) => ({ ...prev, sidebar }));
    };

    useEffect(() => {
        console.log({ state });
    }, [state]);

    return (
        <OptionsContext value={{ ...state, setSidebar }}>
            {children}
        </OptionsContext>
    );
}
