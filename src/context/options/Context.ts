import { createContext, useContext } from "react";
import { OptionsCallbacks, OptionsType } from "./types";

export const OptionsStateDefaults: OptionsType = {
    sidebar: true,
    viewport: {
        width: 480,
        height: 800,
        isMobile: true,
        isTablet: false,
        isDesktop: false,
    },
};

export const OptionsCallbacksDefaults: OptionsCallbacks = {
    setSidebar: () => {},
};

export const OptionsContext = createContext<OptionsType & OptionsCallbacks>({
    ...OptionsStateDefaults,
    ...OptionsCallbacksDefaults,
});

export function useOptionsContext() {
    return useContext(OptionsContext);
}
